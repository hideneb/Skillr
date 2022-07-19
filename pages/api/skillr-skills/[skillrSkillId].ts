import type { NextApiRequest, NextApiResponse } from 'next';
import { endNotFound, endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { SkillrSkillDto } from '../../../lib/types/skillr';

export type PatchSkillrSkill = {
    ratePerMinute?: number;
    brief?: string;
    submit?: boolean;
    cancel?: boolean;
};

const { API_HOST } = process.env;
export const updateSkillrSkill = async (
    jwt: string,
    skillrSkillId: string,
    body: PatchSkillrSkill
): Promise<SkillrSkillDto> => {
    return fetch(`${API_HOST}/api/app/skillrSkills/${skillrSkillId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrSkillDto>) {
    const { method, body, query } = req;
    const skillrSkillId = Array.isArray(query.skillrSkillId) ? query.skillrSkillId[0] : query.skillrSkillId;
    if (!skillrSkillId) {
        return endNotFound(res);
    }

    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }

    switch (method) {
        case 'PUT':
            const skillrSkillDto = await updateSkillrSkill(auth.jwt, skillrSkillId, body);
            res.status(200).json(skillrSkillDto);
            break;
        default:
            res.setHeader('Allow', ['PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
