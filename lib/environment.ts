export const isProd = (): boolean => {
    return process.env.VERCEL_ENV === 'production';
};
