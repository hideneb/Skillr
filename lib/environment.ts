export const isProd = (): boolean => {
    return process.env.VERCEL_ENV === 'production';
};

export const isDev = (): boolean => {
    return process.env.NODE_ENV === "development"
}