import { IncomingMessage, ServerResponse } from 'http';
import Jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import { refreshToken } from '../pages/api/refreshtoken';
import { getTokenCookie, setTokenCookie } from './auth-cookies';
import { UserToken } from './types/user';

export const getAuthToken = (req: NextApiRequest): UserToken | undefined => {
    const authStr = getTokenCookie(req);
    if (!authStr) {
        return;
    }
    return JSON.parse(authStr);
};

export const endUnauthorized = (res: NextApiResponse) => {
    res.status(401).end(JSON.stringify({ errorcode: '10002' }));
};

export const endNotFound = (res: NextApiResponse) => {
    res.status(404).end();
};

export const getUnexpiredToken = async (
    req: IncomingMessage & {
        cookies: NextApiRequestCookies;
    },
    res: ServerResponse
): Promise<UserToken | undefined> => {
    const authStr = getTokenCookie(req);
    if (!authStr) {
        return;
    }
    const auth: UserToken = JSON.parse(authStr);
    if (!auth.jwt) {
        return;
    }
    const jwtPayload = Jwt.decode(auth.jwt, { json: true });
    if (jwtPayload?.exp && jwtPayload.exp < Date.now() / 1000) {
        const { jwt } = await refreshToken(auth.refreshJwt);
        setTokenCookie(res, JSON.stringify({ ...auth, jwt }));
        return { ...auth, jwt };
    }
    return auth;
};
