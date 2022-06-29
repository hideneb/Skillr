import { NextApiRequest, NextApiResponse } from 'next';
import { endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { SkillrBookDto } from '../../../lib/types/skillrBook';

const { API_HOST } = process.env;

export const getSkillrBookById = async (jwt: string, skillrBookId: string): Promise<SkillrBookDto> => {
    return fetch(`${API_HOST}/api/app/skillrbooks/${skillrBookId}`, {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    }).then((res) => res.json());
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrBookDto>) {
    const { query, method } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    const skillrBookId = Array.isArray(query.skillrBookId) ? query.skillrBookId[0] : query.skillrBookId;
    switch (method) {
        case 'GET':
            const skillrBook = await getSkillrBookById(auth.jwt, skillrBookId);
            res.status(200).json(skillrBook);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
