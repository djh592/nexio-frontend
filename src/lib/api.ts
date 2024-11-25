import axios from 'axios';
import { User, FriendGroup, FriendGroups, FriendRequest, FriendRequests } from '@/lib/definitions';

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
export interface PostRegisterRequest {
    userName: string;
    password: string;
    phoneNumber: string;
    emailAddress: string;
}

export interface PostRegisterResponse {
    code: number;
    info: string;
    token: string;
    user: User;
}

export const postRegister = async (data: PostRegisterRequest): Promise<PostRegisterResponse> => {
    const response = await apiClient.post<PostRegisterResponse>('/register', data);
    return response.data;
};


// POST: /login
export interface PostLoginRequest {
    userName: string;
    password: string;
}

export interface PostLoginResponse {
    code: number;
    info: string;
    token: string;
    user: User;
}

export const postLogin = async (data: PostLoginRequest): Promise<PostLoginResponse> => {
    const response = await apiClient.post<PostLoginResponse>('/login', data);
    return response.data;
};


// DELETE: /unregister
export interface DeleteUnregisterRequest {
    userId: string;
    password: string;
}

export interface DeleteUnregisterResponse {
    code: number;
    info: string;
}

export const deleteUnregister = async (data: DeleteUnregisterRequest): Promise<DeleteUnregisterResponse> => {
    const response = await apiClient.delete<DeleteUnregisterResponse>('/unregister', { data });
    return response.data;
};


// DELETE: /logout
export interface DeleteLogoutRequest {
    userId: string;
}

export interface DeleteLogoutResponse {
    code: number;
    info: string;
}

export const deleteLogout = async (data: DeleteLogoutRequest): Promise<DeleteLogoutResponse> => {
    const response = await apiClient.delete<DeleteLogoutResponse>('/logout', { data });
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
export interface PutUserRequest {
    oldPassword?: string;
    newPassword?: string;
    userName?: string;
    phoneNumber?: string;
    emailAddress?: string;
    avatarImage?: string;
}

function checkUpdateUserRequest(request: PutUserRequest): boolean {
    if (request.oldPassword && !request.newPassword) return false;
    if (request.newPassword && !request.oldPassword) return false;
    return true;
}

export interface PutUserResponse {
    code: number;
    info: string;
    user: User;
}

export const putUser = async (userId: string, data: PutUserRequest): Promise<PutUserResponse> => {
    if (!checkUpdateUserRequest(data)) {
        throw new Error('Old password and new password must be provided together.');
    }
    const response = await apiClient.put<PutUserResponse>(`/user/${userId}`, data);
    return response.data;
};


// GET: /users
export interface GetUsersRequest {
    userIds: string[];
}
export interface GetUsersResponse {
    code: number;
    info: string;
    users: User[];
}

export const getUsers = async (data: GetUsersRequest): Promise<GetUsersResponse> => {
    const response = await apiClient.get<GetUsersResponse>('/users', { params: data });
    return response.data;
};


// GET: /users/search
export interface GetUsersSearchRequest {
    searchText: string;
}

export interface GetUsersSearchResponse {
    code: number;
    info: string;
    users: User[];
}

export const getUsersSearch = async (data: GetUsersSearchRequest): Promise<GetUsersSearchResponse> => {
    const response = await apiClient.get<GetUsersSearchResponse>('/users/search', { params: data });
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
export interface DeleteFriendsGroupsRequest {
    userId: string;
    groupName: string;
}

export interface DeleteFriendsGroupsResponse {
    code: number;
    info: string;
    friendGroups: FriendGroups;
}

export const deleteFriendsGroups = async (data: DeleteFriendsGroupsRequest): Promise<DeleteFriendsGroupsResponse> => {
    const response = await apiClient.delete<DeleteFriendsGroupsResponse>('/friends/groups', { data });
    return response.data;
};


// PATCH: /friends/groups
export interface PatchFriendsGroupsRequest {
    userId: string;
    friendUserId: string;
    fromGroupName: string;
    toGroupName: string;
}

export interface PatchFriendsGroupsResponse {
    code: number;
    info: string;
    friendGroups: FriendGroups;
}

export const patchFriendsGroups = async (data: PatchFriendsGroupsRequest): Promise<PatchFriendsGroupsResponse> => {
    const response = await apiClient.patch<PatchFriendsGroupsResponse>('/friends/groups', data);
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


// DELETE: /friends
export interface DeleteFriendsRequest {
    userId: string;
    friendId: string;
}

export interface DeleteFriendsResponse {
    code: number;
    info: string;
}

export const deleteFriends = async (data: DeleteFriendsRequest): Promise<DeleteFriendsResponse> => {
    const response = await apiClient.delete<DeleteFriendsResponse>(`/friends`, { data });
    return response.data;
};


// GET: /friends/requests
export interface GetFriendsRequestsRequest {
    userId: string;
}

export interface GetFriendsRequestsResponse {
    code: number;
    info: string;
    sentRequests: FriendRequests;
    receivedRequests: FriendRequests;
}

export const getFriendsRequests = async (data: GetFriendsRequestsRequest): Promise<GetFriendsRequestsResponse> => {
    const response = await apiClient.get<GetFriendsRequestsResponse>('/friends/requests', { params: data });
    return response.data;
};


// POST: /friends/requests
export interface PostFriendsRequestsRequest {
    fromUserId: string;
    toUserId: string;
}

export interface PostFriendsRequestsResponse {
    code: number;
    info: string;
    friendRequest: FriendRequest;
}

export const postFriendsRequests = async (data: PostFriendsRequestsRequest): Promise<PostFriendsRequestsResponse> => {
    const response = await apiClient.post<PostFriendsRequestsResponse>('/friends/requests', data);
    return response.data;
};


// PATCH: /friends/requests
export interface PatchFriendsRequestsRequest {
    friendRequest: FriendRequest;
}

export interface PatchFriendsRequestsResponse {
    code: number;
    info: string;
    friendRequest: FriendRequest;
}

export const patchFriendsRequests = async (data: PatchFriendsRequestsRequest): Promise<PatchFriendsRequestsResponse> => {
    const response = await apiClient.patch<PatchFriendsRequestsResponse>('/friends/requests', data);
    return response.data;
};


