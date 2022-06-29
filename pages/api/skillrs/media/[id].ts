import { NextApiRequest, NextApiResponse } from 'next';
import { endNotFound } from '../../../../lib/api-helpers';
import { endUnauthorized, getAuthToken } from '../../../../lib/api-helpers';
import { SkillrBookDto } from '../../../../lib/types/skillrBook';

const { API_HOST } = process.env;

export const updateSkillrMedia = async (jwt: string, id: string, body: unknown): Promise<SkillrBookDto> => {
    return fetch(`${API_HOST}/api/app/skillrMedia/${id}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => res.json());
};

export const deleteSkillrMedia = async (jwt: string, id: string, body: unknown): Promise<unknown> => {
    return fetch(`${API_HOST}/api/app/skillrMedia/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${jwt}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }).then((res) => {
        if (res.status === 204) {
            return;
        }
        return res.json();
    });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<SkillrBookDto | unknown>) {
    const { query, method, body } = req;
    const auth = getAuthToken(req);
    if (!auth) {
        return endUnauthorized(res);
    }
    const id = Array.isArray(query.id) ? query.id[0] : query.id;

    if (!id) {
        return endNotFound(res);
    }
    switch (method) {
        case 'PUT':
            const updateSkillrResponse = await updateSkillrMedia(auth.jwt, id, body);
            res.status(200).json(updateSkillrResponse);
            break;
        case 'DELETE':
            const deleteResponse = await deleteSkillrMedia(auth.jwt, id, body);
            res.status(200).json(deleteResponse);
            break;
        default:
            res.setHeader('Allow', ['PUT', 'DELETE']);
            res.status(405).end(`Method ${method} Not Allowed`);
    }
}
