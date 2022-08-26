import type { NextApiRequest, NextApiResponse } from 'next';
import { SkillDto } from '@/lib/types/skill';

const { API_HOST } = process.env;
export const findSkills = async (hasSkillrs?: boolean): Promise<SkillDto[]> => {
    return fetch(`${API_HOST}/api/app/skills?hasSkillrs=${hasSkillrs}`).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillDto[]>) {
    const { method } = req;
    switch (method) {
        case 'GET':
            const skills = await findSkills(true);
            res.status(200).json(skills);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
