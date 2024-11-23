import axios from 'axios';
import { User, FriendGroup, FriendGroups } from '@/lib/definitions';

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


// DELETE: /logout
export interface LogoutRequest {
    userId: string;
}

export interface LogoutResponse {
    code: number;
    info: string;
}

export const logoutUser = async (data: LogoutRequest): Promise<LogoutResponse> => {
    const response = await apiClient.delete<LogoutResponse>('/logout', { data });
    return response.data;
};


// GET: /user/{userId}
export interface GetUserResponse {
    code: number;
    info: string;
    user: User;
}

export const getUser = async (userId: string): Promise<GetUserResponse> => {
    const response = await apiClient.get<GetUserResponse>(`/user/${userId}`);
    return response.data;
};


// PUT: /user/{userId}
export interface UpdateUserRequest {
    oldPassword?: string;
    newPassword?: string;
    userName?: string;
    phoneNumber?: string;
    emailAddress?: string;
    avatarImage?: string;
}

function checkUpdateUserRequest(request: UpdateUserRequest): boolean {
    if (request.oldPassword && !request.newPassword) return false;
    if (request.newPassword && !request.oldPassword) return false;
    return true;
}

export interface UpdateUserResponse {
    code: number;
    info: string;
    user: User;
}

export const updateUser = async (userId: string, data: UpdateUserRequest): Promise<UpdateUserResponse> => {
    if (!checkUpdateUserRequest(data)) {
        throw new Error('Both oldPassword and newPassword must be provided.');
    }
    const response = await apiClient.put<UpdateUserResponse>(`/user/${userId}`, data);
    return response.data;
};


// GET: /users/search
export interface SearchUsersRequest {
    query: string;
}

export interface SearchUsersResponse {
    code: number;
    info: string;
    resluts: User[];
}

export const searchUsers = async (data: SearchUsersRequest): Promise<SearchUsersResponse> => {
    const response = await apiClient.get<SearchUsersResponse>('/users/search', { params: data });
    return response.data;
};


// POST: /friends/groups
export interface PostFriendsGroupsRequest {
    userId: string;
    groupName: string;
}

export interface PostFriendsGroupsResponse {
    code: number;
    info: string;
    friendGroup: FriendGroup;
}

export const postFriendsGroups = async (data: PostFriendsGroupsRequest): Promise<PostFriendsGroupsResponse> => {
    const response = await apiClient.post<PostFriendsGroupsResponse>('/friends/groups', data);
    return response.data;
};


// DELETE: /friends/groups
export interface DeleteFriendGroupRequest {
    userId: string;
    groupName: string;
}

export interface DeleteFriendGroupResponse {
    code: number;
    info: string;
    friendGroups: FriendGroups;
}

export const deleteFriendGroup = async (data: DeleteFriendGroupRequest): Promise<DeleteFriendGroupResponse> => {
    const response = await apiClient.delete<DeleteFriendGroupResponse>('/friends/groups', { data });
    return response.data;
};


// PATCH: /friends/groups
export interface PatchFriendGroupRequest {
    userId: string;
    friendUserId: string;
    fromGroupName: string;
    toGroupName: string;
}

export interface PatchFriendGroupResponse {
    code: number;
    info: string;
    friendGroups: FriendGroups;
}

export const patchFriendGroup = async (data: PatchFriendGroupRequest): Promise<PatchFriendGroupResponse> => {
    const response = await apiClient.patch<PatchFriendGroupResponse>('/friends/groups', data);
    return response.data;
};


// GET: /friends
export interface GetFriendsRequest {
    userId: string;
}

export interface GetFriendsResponse {
    code: number;
    info: string;
    friendGroups: FriendGroups;
}

export const getFriends = async (data: GetFriendsRequest): Promise<GetFriendsResponse> => {
    const response = await apiClient.get<GetFriendsResponse>('/friends', { params: data });
    return response.data;
};


