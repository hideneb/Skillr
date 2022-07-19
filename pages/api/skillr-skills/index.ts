import type { NextApiRequest, NextApiResponse } from 'next';
import { endNotFound, endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { SkillrSkillDto } from '../../../lib/types/skillr';

const { API_HOST } = process.env;
export const getSkillrSkills = async (jwt: string): Promise<SkillrSkillDto[]> => {
    return fetch(`${API_HOST}/api/app/skillrSkills`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrSkillDto[]>) {
    const { query, method } = req;
    const skillrId = Array.isArray(query.id) ? query.id[0] : query.id;
    if (!skillrId) {
        return endNotFound(res);
    }

    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    switch (method) {
        case 'GET':
            const skillr = await getSkillrSkills(skillrId);
            res.status(200).json(skillr);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
