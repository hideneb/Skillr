import type { NextApiRequest, NextApiResponse } from 'next';
import { SkillDto } from '@/lib/types/skill';

const { API_HOST } = process.env;
export const getSkillById = async (skillId: number): Promise<SkillDto> => {
    return fetch(`${API_HOST}/api/app/skills/${skillId}`).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillDto>) {
    const { query, method } = req;
    const skillId = Number(Array.isArray(query.skillId) ? query.skillId[0] : query.skillId);
    switch (method) {
        case 'GET':
            const skill = await getSkillById(skillId);
            res.status(200).json(skill);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
