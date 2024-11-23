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
