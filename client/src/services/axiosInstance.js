import axios from 'axios';
import authService from './authService';
import { BASEURL } from '../constants/constants';

const instance = axios.create({
    baseURL: BASEURL,
});

instance.interceptors.request.use(
    async (config) => {
        const noAuthRequiredEndpoints = ['/products'];

        if (!noAuthRequiredEndpoints.includes(config.url)) {
            let accessToken = authService.getAccessToken();
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Handle token refresh on 401 error
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 403) {
        const newToken = await authService.refreshAccessToken();
        const accessToken = newToken.access;
        if (accessToken) {
            error.config.headers['Authorization'] = `Bearer ${accessToken}`;
            return axios(error.config);
        }
        }
        return Promise.reject(error);
    }
);

export default instance;
