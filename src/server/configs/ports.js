const devMode = process.env.NODE_ENV !== 'production';

export const appServer = devMode ? 3000 : 8080;
export const webpackServer = appServer + 1;
