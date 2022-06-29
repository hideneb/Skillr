import type { NextApiRequest, NextApiResponse } from 'next';
import { getTokenCookie, setTokenCookie } from '../../lib/auth-cookies';
import { VerifySmsCodeResponse } from './auth/verify-sms';

export type RefreshJwtDto = {
    jwt: string;
};

const { API_HOST } = process.env;
export const refreshToken = async (refreshJwt: string): Promise<RefreshJwtDto> => {
    return fetch(`${API_HOST}/api/app/refreshtoken`, {
        headers: {
            Authorization: `Bearer ${refreshJwt}`,
        },
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<RefreshJwtDto>) {
    const { method } = req;
    const auth: VerifySmsCodeResponse = JSON.parse(getTokenCookie(req));
    switch (method) {
        case 'GET':
            const refresh = await refreshToken(auth.refreshJwt);
            setTokenCookie(res, JSON.stringify({ ...auth, jwt: refresh.jwt }));
            res.status(200).json(refresh);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
