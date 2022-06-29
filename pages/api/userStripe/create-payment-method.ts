import type { NextApiRequest, NextApiResponse } from 'next';
import { endUnauthorized, getAuthToken } from '../../../lib/api-helpers';

export type CreatePaymentMethodDto = {
    clientSecret: string;
};

const { API_HOST } = process.env;
export const createPaymentMethod = async (jwt: string): Promise<CreatePaymentMethodDto> => {
    return fetch(`${API_HOST}/api/app/userStripe/createPaymentMethod`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<CreatePaymentMethodDto>) {
    const { method } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    switch (method) {
        case 'POST':
            const user = await createPaymentMethod(auth.jwt);
            res.status(200).json(user);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
