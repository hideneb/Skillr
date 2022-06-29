import { NextApiRequest, NextApiResponse } from 'next';
import { endUnauthorized, getAuthToken } from '../../../lib/api-helpers';
import { PaginatedResponse } from '../../../lib/types/common';
import { SkillrBookDto } from '../../../lib/types/skillrBook';

export enum QueryParamsSkillrBookTypes {
    Past = 'past',
    Upcoming = 'upcoming',
    Requested = 'requested',
}

export type QueryParamsSkillrBookUser = {
    page: number;
    limit: number;
    type: QueryParamsSkillrBookTypes;
};

const { API_HOST } = process.env;

export const getPageOfSkillrBooksForUser = async (
    jwt: string,
    query: QueryParamsSkillrBookUser
): Promise<PaginatedResponse<SkillrBookDto, 'skillrBooks'>> => {
    return fetch(
        `${API_HOST}/api/app/skillrbooks/user?${new URLSearchParams(
            query as unknown as Record<string, string>
        ).toString()}`,
        {
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        }
    ).then((res) => res.json());
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<PaginatedResponse<SkillrBookDto, 'skillrBooks'>>
) {
    const { query, method } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    const page = Number(Array.isArray(query.page) ? query.page[0] : query.page);
    const limit = Number(Array.isArray(query.limit) ? query.limit[0] : query.limit);
    const type = (Array.isArray(query.type) ? query.type[0] : query.type) as QueryParamsSkillrBookTypes;
    switch (method) {
        case 'GET':
            const skillr = await getPageOfSkillrBooksForUser(auth.jwt, {
                page,
                limit,
                type,
            });
            res.status(200).json(skillr);
            break;
        default:
            res.setHeader('Allow', ['GET']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
