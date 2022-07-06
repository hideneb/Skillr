import { NextApiRequest, NextApiResponse } from 'next';
import { endUnauthorized, getAuthToken } from '../../../lib/api-helpers';

const { API_HOST } = process.env;

export type SkillrPresenceDto = {
    presentUntil?: Date;
};

export const getSkillrPresence = async (jwt: string): Promise<SkillrPresenceDto> => {
    return fetch(`${API_HOST}/api/app/skillrPresence`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export const saveSkillrPresence = async (jwt: string, body: SkillrPresenceDto): Promise<SkillrPresenceDto> => {
    return fetch(`${API_HOST}/api/app/skillrPresence`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrPresenceDto>) {
    const { method } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    switch (method) {
        case 'GET': {
            const skillrPresence = await getSkillrPresence(auth.jwt);
            res.status(200).json(skillrPresence);
            break;
        }
        case 'POST': {
            const body = req.body;
            const skillrPresence = await saveSkillrPresence(auth.jwt, body);
            res.status(200).json(skillrPresence);
            break;
        }
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
