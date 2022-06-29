import { NextApiRequest, NextApiResponse } from 'next';
import { endUnauthorized, getAuthToken } from '../../../lib/api-helpers';

const { API_HOST } = process.env;

export type ChatTokenDto = {
    token: string;
};

export const createChatToken = async (jwt: string): Promise<ChatTokenDto> => {
    return fetch(`${API_HOST}/api/app/chat/token`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<ChatTokenDto>) {
    const { query, method } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    switch (method) {
        case 'POST': {
            const chatToken: ChatTokenDto = await createChatToken(auth.jwt);
            res.status(200).json(chatToken);
            break;
        }
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
