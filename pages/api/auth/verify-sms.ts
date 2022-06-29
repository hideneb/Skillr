import type { NextApiRequest, NextApiResponse } from 'next';
import { setTokenCookie } from '../../../lib/auth-cookies';

const { API_HOST } = process.env;

export type VerifySmsCodeResponse = {
    id: string;
    refreshJwt: string;
    jwt: string;
};

export const verifySms = async (
    phoneNumber: string,
    code: string,
    newUserId?: string
): Promise<VerifySmsCodeResponse> => {
    return fetch(`${API_HOST}/api/app/auth/verify-sms`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ phoneNumber, code, newUserId }),
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<VerifySmsCodeResponse>) {
    const { method, body } = req;
    const phoneNumber = body['phoneNumber'];
    const code = body['code'];
    const newUserId = body['newUserId'];
    switch (method) {
        case 'POST':
            const status = await verifySms(phoneNumber, code, newUserId);
            setTokenCookie(res, JSON.stringify(status));
            res.status(200).json(status);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
