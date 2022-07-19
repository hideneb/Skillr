import type { NextApiRequest, NextApiResponse } from 'next';
import { endNotFound, endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { StatusDto } from '../auth/request-sms';

const { API_HOST } = process.env;
export const addFavorite = async (jwt: string, skillrId: string): Promise<StatusDto> => {
    return fetch(`${API_HOST}/api/app/skillrFavourites/${skillrId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export const removeFavorite = async (jwt: string, skillrId: string): Promise<StatusDto> => {
    return fetch(`${API_HOST}/api/app/skillrFavourites/${skillrId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<StatusDto>) {
    const { method, query } = req;
    const skillrId = Array.isArray(query.skillrId) ? query.skillrId[0] : query.skillrId;
    if (!skillrId) {
        return endNotFound(res);
    }

    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    switch (method) {
        case 'POST': {
            const status = await addFavorite(auth.jwt, skillrId);
            res.status(200).json(status);
            break;
        }
        case 'DELETE': {
            const status = await removeFavorite(auth.jwt, skillrId);
            res.status(200).json(status);
            break;
        }
        default:
            res.setHeader('Allow', ['POST', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
