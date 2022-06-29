import type { NextApiRequest, NextApiResponse } from 'next';

export type SkillDto = {
    id: number;
    disabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    lightIcon: string;
    lightIconFilename: string;
    darkIcon: string;
    darkIconFilename: string;
    popularIcon: string;
    popularIconFilename: string;
    parentId: number;
    isAvailableForInstantMatch?: boolean;
};

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
