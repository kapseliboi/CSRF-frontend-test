import axios from 'axios';
import config from '../config';
import { User, Post } from './types';

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

export async function logout(): Promise<void> {
    try {
        await axios.post("/auth/logout");
    } catch (e) {
        console.log(`Something went wrong with logout: ${e}`);
    }
}

export async function getPosts(): Promise<Post[] | null> {
    try {
        const response = await axios.get<Post[]>("/post");
        if (response.status !== 200) {
            console.log(`Something went wrong with the API, status: ${response.status}`);
            return [];
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function createPost(title: string, text: string): Promise<Post | null> {
    try {
        const response = await axios.post<Post>('/post', { title, text });
        if (response.status !== 200) {
            console.log(`Something went wrong with the API, status: ${response.status}`);
            return null;
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function editPost(id: number, title: string, text: string): Promise<Post | null> {
    try {
        const response = await axios.put<Post>(`/post/${id}`, { text, title });
        if (response.status !== 200) {
            console.log(`Something went wrong with the API, status: ${response.status}`);
            return null;
        }
        return response.data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function deletePost(id: number): Promise<boolean> {
    try {
        const response = await axios.delete(`/post/${id}`);
        if (response.status !== 204) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(`Something went wrong with API: ${e}`);
        return false;
    }
}
