import Router from 'next/router';
import { refreshToken } from './authed-fetch';

const { API_HOST } = process.env;

export const apiHostFetch = async (url: string, options: RequestInit = {}, redirect = true) => {
    const res = await fetch(API_HOST + url, options);

    try {
        const resJson = await res.clone().json();
        if (resJson.errorcode) {
            switch (resJson.errorcode) {
                case '10001':
                    await refreshToken();
                    return fetch(API_HOST + url, options);
                case '10002': {
                    if (redirect) {
                        const redirect = document.location.pathname + document.location.search + document.location.hash;
                        Router.push({
                            pathname: '/login',
                            query: { r: redirect },
                        });
                    }
                    return res;
                }
            }
        }
    } catch (e) {
        const text = await res.clone().text();
        console.log(`Unable to parse as json: [${text}]`, e);
    }
    return res;
};
