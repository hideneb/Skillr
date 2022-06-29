import type { NextApiRequest, NextApiResponse } from 'next';

const { API_HOST } = process.env;

export type StatusDto = {
    status: string;
};

const requestSms = async (phoneNumber: string): Promise<StatusDto> => {
    return fetch(`${API_HOST}/api/app/auth/request-sms`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<StatusDto>) {
    const { method, body } = req;
    const phoneNumber = body['phoneNumber'];
    switch (method) {
        case 'POST':
            const status = await requestSms(phoneNumber);
            res.status(200).json(status);
            break;
        default:
            res.setHeader('Allow', ['POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
