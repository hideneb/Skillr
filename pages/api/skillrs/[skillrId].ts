import type { NextApiRequest, NextApiResponse } from 'next';
import { endNotFound } from '../../../lib/api-helpers';
import { PaginatedResponse } from '../../../lib/types/common';
import { SkillrDto } from '../../../lib/types/skillr';

const { API_HOST } = process.env;
export const getSkillrById = async (skillrId: string): Promise<SkillrDto> => {
    return fetch(`${API_HOST}/api/app/skillrs/${skillrId}`).then((res) => res.json());
};

type GetSkillrsQuery = {
    page: number;
    limit: number;
    recommended?: boolean;
    featured?: boolean;
    influencer?: boolean;
    isFavourite?: boolean;
    isAvailableNow?: boolean;
    skill?: number;
};

export const getPageOfSkillrs = async (
    query: GetSkillrsQuery,
    jwt?: string
): Promise<PaginatedResponse<SkillrDto, 'skillrs'>> => {
    const headers: HeadersInit = jwt ? { Authorization: `Bearer ${jwt}` } : {};
    return fetch(
        `${API_HOST}/api/app/skillrs?${new URLSearchParams(query as unknown as Record<string, string>).toString()}`,
        {
            headers,
        }
    ).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrDto>) {
    const { query, method } = req;
    const skillrId = Array.isArray(query.skillrId) ? query.skillrId[0] : query.skillrId;
    if (!skillrId) {
        return endNotFound(res);
    }

    switch (method) {
        case 'GET':
            const skillr = await getSkillrById(skillrId);
            res.status(200).json(skillr);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
