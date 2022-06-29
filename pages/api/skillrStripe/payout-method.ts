import type { NextApiRequest, NextApiResponse } from 'next';
import { endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { PayoutMethod } from '../../../lib/types/stripe';

const { API_HOST } = process.env;
export const getPayoutMethod = async (jwt: string): Promise<PayoutMethod> => {
    return fetch(`${API_HOST}/api/app/skillrStripe/payoutMethod`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<PayoutMethod>) {
    const { method } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    switch (method) {
        case 'GET':
            const payoutMethod = await getPayoutMethod(auth.jwt);
            res.status(200).json(payoutMethod);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
