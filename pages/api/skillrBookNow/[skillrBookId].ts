import type { NextApiRequest, NextApiResponse } from 'next';
import { endNotFound, endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { ConnectNowDto } from '../../../lib/types/skillrBook';

const { API_HOST } = process.env;
export const checkSkillrBookNow = async (jwt: string, skillrBookId: string): Promise<ConnectNowDto> => {
    return fetch(`${API_HOST}/api/app/skillrbooksNow/${skillrBookId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then(async (res) => {
        const text = await res.clone().text();
        return res.status < 500
            ? res.json()
            : {
                  text,
              };
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ConnectNowDto>) {
    const { query, method } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    const skillrBookId = Array.isArray(query.skillrBookId) ? query.skillrBookId[0] : query.skillrBookId;
    if (!skillrBookId) {
        return endNotFound(res);
    }

    switch (method) {
        case 'GET':
            const skill = await checkSkillrBookNow(auth.jwt, skillrBookId);
            res.status(200).json(skill);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
