import type { NextApiRequest, NextApiResponse } from 'next';
import { endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { SkillrDto } from '../../../lib/types/skillr';
import { SkillrStep2 } from '../../skillr/profile';
import { SkillrDDto } from './me';

const { API_HOST } = process.env;
export const updateSkillr = async (jwt: string, body: SkillrStep2): Promise<SkillrDDto> => {
    return fetch(`${API_HOST}/api/app/skillrs`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrDto | SkillrDDto>) {
    const { method, body } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }

    switch (method) {
        case 'PUT':
            const skillrDDto = await updateSkillr(auth.jwt, body);
            res.status(200).json(skillrDDto);
            break;
        default:
            res.setHeader('Allow', ['PUT']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
