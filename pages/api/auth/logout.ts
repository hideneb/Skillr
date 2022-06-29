import type { NextApiRequest, NextApiResponse } from 'next';
import { endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { removeTokenCookie } from '../../../lib/auth-cookies';
import { StatusDto } from './request-sms';

const { API_HOST } = process.env;

type LogoutRequestBody = {
    deviceToken?: string;
};

export const logout = async (jwt: string, body: LogoutRequestBody = {}): Promise<StatusDto> => {
    return fetch(`${API_HOST}/api/app/auth/logout`, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${jwt}`,
        },
        method: 'POST',
        body: JSON.stringify(body),
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<StatusDto>) {
    const { method, body } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    switch (method) {
        case 'POST':
            const status = await logout(auth.jwt, body);
            if (status.status) {
                removeTokenCookie(res);
            }
            res.status(200).json(status);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
