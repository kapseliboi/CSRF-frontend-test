import axios from 'axios';
import config from '../config';
import { User } from './types';

axios.defaults.baseURL = config.API_URL;
axios.defaults.xsrfCookieName = config.CSRF_COOKIE_NAME;
axios.defaults.xsrfHeaderName = config.CSRF_HEADER_NAME;
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = (status) => status < 500;
axios.defaults.timeout = 5000;

export async function login(usernameOrEmail: string, password: string): Promise<User | undefined | null> {
    try {
        const response = await axios.post<User>('/auth/login', { usernameOrEmail, password });
        if (response.status === 401) {
            return undefined;
        } else if (response.status !== 200) {
            return null;
        }
        return response.data;
    } catch (e) {
        console.log(`Something is wrong with API: ${e}`);
        return null;
    }
}

export async function checkLogin(): Promise<User | undefined> {
    try {
        const response = await axios.get<User | undefined>('/user');
        return response.data;
    } catch (e) {
        console.log(`Something is wrong with API: ${e}`);
    }
}
