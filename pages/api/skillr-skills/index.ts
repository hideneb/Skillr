import type { NextApiRequest, NextApiResponse } from 'next';
import { endNotFound, endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { SkillrSkillDto } from '../../../lib/types/skillr';

export interface CreateSkillrSkill extends Partial<SkillrSkillDto> {
    tags: string[];
}

const { API_HOST } = process.env;
export const getSkillrSkills = async (jwt: string): Promise<SkillrSkillDto[]> => {
    return fetch(`${API_HOST}/api/app/skillrSkills`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export const createSkillrSkill = async (jwt: string, body: CreateSkillrSkill): Promise<SkillrSkillDto> => {
    return fetch(`${API_HOST}/api/app/skillrSkills`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrSkillDto | SkillrSkillDto[]>) {
    const { query, method, body } = req;
    const skillrId = Array.isArray(query.id) ? query.id[0] : query.id;

    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    switch (method) {
        case 'GET':
            if (!skillrId) {
                return endNotFound(res);
            }

            const skillr = await getSkillrSkills(skillrId);
            res.status(200).json(skillr);
            break;
        case 'POST':
            const skillrSkillDto = await createSkillrSkill(auth.jwt, body);
            res.status(200).json(skillrSkillDto);
            break;
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
