import axios from 'axios';

export const callApi = async ({ config, token, basicAuth }: any) => {
    let encodedToken;
    if (basicAuth) {
        const token = `${basicAuth.auth.username}:${basicAuth.auth.password}`;
        encodedToken = Buffer.from(token).toString('base64');
    }

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        ...(typeof token === 'string' && { Authorization: token }),
        ...(basicAuth && { Authorization: 'Basic ' + encodedToken })
    };

    const updatedConfig = {
        ...config,
        headers,
        ...(basicAuth ? { basicAuth } : {}),
    };

    return axios(updatedConfig);
};