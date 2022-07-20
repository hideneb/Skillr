import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { isDev } from './environment';

export function isPageVisible(query: NextParsedUrlQuery): boolean {
    return !!query['viewable'] || isDev();
}
