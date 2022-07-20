import { NextParsedUrlQuery } from "next/dist/server/request-meta";

export const isProd = (): boolean => {
    return process.env.VERCEL_ENV === 'production';
};

export const isDev = (): boolean => {
    return process.env.NODE_ENV === 'development';
};

export function isPageVisible(query: NextParsedUrlQuery): boolean {
    return !!query['viewable'] || isDev() || !isProd();
}
