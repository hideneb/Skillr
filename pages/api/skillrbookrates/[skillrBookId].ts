import { NextApiRequest, NextApiResponse } from 'next';
import { endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { SkillrBookRateDto } from '../../../lib/types/skillrBook';

const { API_HOST } = process.env;

export type BookRate = {
    rate: number;
    note: string;
    badBehaviour: boolean;
    badCompetency: boolean;
    awfulExperience: boolean;
    didntAttendTheCall: boolean;
    badConnection: boolean;
    paymentIssue: boolean;
    other: string;
    seekrAllowedToShare: boolean;
};

export const getSkillrBookRateById = async (jwt: string, skillrBookId: string): Promise<SkillrBookRateDto> => {
    return fetch(`${API_HOST}/api/app/skillrbookRate/${skillrBookId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export const saveSkillrBookRate = async (
    jwt: string,
    skillrBookId: string,
    body: BookRate
): Promise<SkillrBookRateDto> => {
    return fetch(`${API_HOST}/api/app/skillrbookRate/${skillrBookId}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrBookRateDto>) {
    const { query, method } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    const skillrBookId = Array.isArray(query.skillrBookId) ? query.skillrBookId[0] : query.skillrBookId;
    switch (method) {
        case 'GET': {
            const skillrBookRate = await getSkillrBookRateById(auth.jwt, skillrBookId);
            res.status(200).json(skillrBookRate);
            break;
        }
        case 'POST': {
            const body = req.body;
            const skillrBookRate = await saveSkillrBookRate(auth.jwt, skillrBookId, body);
            res.status(200).json(skillrBookRate);
            break;
        }
        default:
            res.setHeader('Allow', ['GET', 'POST']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
