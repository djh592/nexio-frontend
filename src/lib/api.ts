import axios from 'axios';
import { User } from '@/lib/definitions';

const apiClient = axios.create({
    baseURL: 'https://nexio-backend-nexio.app.secoder.net',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});


// POST: /register
export interface RegisterRequest {
    userName: string;
    password: string;
    phoneNumber?: string;
    emailAddress?: string;
}

export interface RegisterResponse {
    code: number;
    info: string;
    token: string;
    user: User;
}

export const registerUser = async (data: RegisterRequest): Promise<RegisterResponse> => {
    const response = await apiClient.post<RegisterResponse>('/register', data);
    return response.data;
};


// POST: /login
export interface LoginRequest {
    userName: string;
    password: string;
}

export interface LoginResponse {
    code: number;
    info: string;
    token: string;
    user: User;
}

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/login', data);
    return response.data;
};


// DELETE: /unregister
export interface UnregisterRequest {
    userId: string;
    password: string;
}

export interface UnregisterResponse {
    code: number;
    info: string;
}

export const unregisterUser = async (data: UnregisterRequest): Promise<UnregisterResponse> => {
    const response = await apiClient.delete<UnregisterResponse>('/unregister', { data });
    return response.data;
};


