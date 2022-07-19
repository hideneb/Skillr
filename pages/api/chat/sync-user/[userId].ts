import { NextApiRequest, NextApiResponse } from 'next';
import { endNotFound, endUnauthorized, getAuthToken } from '../../../../lib/api-helpers';
import { SkillrBookRateDto } from '../../../../lib/types/skillrBook';

const { API_HOST } = process.env;

export const syncUser = async (jwt: string, userId: string): Promise<SkillrBookRateDto> => {
    return fetch(`${API_HOST}/api/app/chat/sync-user/${userId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrBookRateDto>) {
    const { query, method } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    const userId = Array.isArray(query.userId) ? query.userId[0] : query.userId;
    if (!userId) {
        return endNotFound(res);
    }

    switch (method) {
        case 'POST':
            const userResponse = await syncUser(auth.jwt, userId);
            res.status(200).json(userResponse);
            break;

        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
