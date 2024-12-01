import axios from 'axios';
import {
    User, ResponseFriendGroup, ResponseFriendGroups, FriendRequest, FriendRequests,
    Chat, ChatMessageList, ChatMessageContent, ChatMessage, ChatMessageMeta,
    ChatParticipantList, ChatParticipant, ChatNotificationList, ChatNotification,
    ChatJoinRequestList, ChatJoinRequest
} from '@/lib/definitions';

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

export default apiClient;


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
    token: string;
    user: User;
}

export const putUser = async (userId: string, data: PutUserRequest): Promise<PutUserResponse> => {
    if (!checkUpdateUserRequest(data)) {
        throw new Error('Old password and new password must be provided together.');
    }
    const response = await apiClient.put<PutUserResponse>(`/user/${userId}`, data);
    return response.data;
};


// POST: /users/batch
export interface PostUsersBatchRequest {
    userIds: string[];
}

export interface PostUsersBatchResponse {
    code: number;
    info: string;
    users: User[];
}

export const postUsersBatch = async (data: PostUsersBatchRequest): Promise<PostUsersBatchResponse> => {
    const response = await apiClient.post<PostUsersBatchResponse>('/users/batch', data);
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
    friendGroup: ResponseFriendGroup;
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
    friendGroups: ResponseFriendGroups;
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
    friendGroups: ResponseFriendGroups;
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
    friendGroups: ResponseFriendGroups;
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


// GET /chats
export interface GetChatsRequest {
    userId: string;
}

export interface GetChatsResponse {
    code: number;
    info: string;
    chats: Chat[];
}

export const getChats = async (data: GetChatsRequest): Promise<GetChatsResponse> => {
    const response = await apiClient.get<GetChatsResponse>('/chats', { params: data });
    return response.data;
}


// POST /chats
export interface PostChatsRequest {
    fromUserId: string;
    chatType: string;
    participantIds: string[];
}

export interface PostChatsResponse {
    code: number;
    info: string;
    chat: Chat;
}

export const postChats = async (data: PostChatsRequest): Promise<PostChatsResponse> => {
    const response = await apiClient.post<PostChatsResponse>('/chats', data);
    return response.data;
}


// PATCH /chats/{chatId}
export interface PatchChatsRequest {
    fromUserId: string;
    chatName?: string;
    chatAvatarImage?: string;
    chatSettings?: string;
}

export interface PatchChatsResponse {
    code: number;
    info: string;
    chat: Chat;
}

export const patchChats = async (chatId: string, data: PatchChatsRequest): Promise<PatchChatsResponse> => {
    const response = await apiClient.patch<PatchChatsResponse>(`/chats/${chatId}`, data);
    return response.data;
}


// DELETE /chats/{chatId}
export interface DeleteChatsRequest {
    fromUserId: string;
}

export interface DeleteChatsResponse {
    code: number;
    info: string;
}

export const deleteChats = async (chatId: string, data: DeleteChatsRequest): Promise<DeleteChatsResponse> => {
    const response = await apiClient.delete<DeleteChatsResponse>(`/chats/${chatId}`, { data });
    return response.data;
}


// GET /messages/{messageListId}
export interface GetMessagesRequest {
    fromUserId: string;
}

export interface GetMessagesResponse {
    code: number;
    info: string;
    chatMessageList: ChatMessageList;
}

export const getMessages = async (messageListId: string, data: GetMessagesRequest): Promise<GetMessagesResponse> => {
    const response = await apiClient.get<GetMessagesResponse>(`/messages/${messageListId}`, { params: data });
    return response.data;
}


// POST /messages/{messageListId}
export interface PostMessagesRequest {
    fromUserId: string;
    chatMessageContent: ChatMessageContent;
}

export interface PostMessagesResponse {
    code: number;
    info: string;
    chatMessage: ChatMessage;
}

export const postMessages = async (messageListId: string, data: PostMessagesRequest): Promise<PostMessagesResponse> => {
    const response = await apiClient.post<PostMessagesResponse>(`/messages/${messageListId}`, data);
    return response.data;
}


// PATCH /messages/{messageListId}
export interface PatchMessagesRequest {
    fromUserId: string;
    chatMessageMeta: ChatMessageMeta;
}

export interface PatchMessagesResponse {
    code: number;
    info: string;
    chatMessage: ChatMessage;
}

export const patchMessages = async (messageListId: string, data: PatchMessagesRequest): Promise<PatchMessagesResponse> => {
    const response = await apiClient.patch<PatchMessagesResponse>(`/messages/${messageListId}`, data);
    return response.data;
}


// GET /participants/{participantListId}
export interface GetParticipantsRequest {
    fromUserId: string;
}

export interface GetParticipantsResponse {
    code: number;
    info: string;
    chatParticipantList: ChatParticipantList;
}

export const getParticipants = async (participantListId: string, data: GetParticipantsRequest): Promise<GetParticipantsResponse> => {
    const response = await apiClient.get<GetParticipantsResponse>(`/participants/${participantListId}`, { params: data });
    return response.data;
}


// PATCH /participants/{participantListId}/
export interface PatchParticipantsRequest {
    fromUserId: string;
    chatParticipant: ChatParticipant;
}

export interface PatchParticipantsResponse {
    code: number;
    info: string;
    chatParticipant: ChatParticipant;
}

export const patchParticipants = async (participantListId: string, data: PatchParticipantsRequest): Promise<PatchParticipantsResponse> => {
    const response = await apiClient.patch<PatchParticipantsResponse>(`/participants/${participantListId}`, data);
    return response.data;
}


// GET /notifications/{notificationListId}
export interface GetNotificationsRequest {
    fromUserId: string;
}

export interface GetNotificationsResponse {
    code: number;
    info: string;
    chatNotificationList: ChatNotificationList;
}

export const getNotifications = async (notificationListId: string, data: GetNotificationsRequest): Promise<GetNotificationsResponse> => {
    const response = await apiClient.get<GetNotificationsResponse>(`/notifications/${notificationListId}`, { params: data });
    return response.data;
}


// POST /notifications/{notificationListId}
export interface PostNotificationsRequest {
    fromUserId: string;
    chatNotification: ChatNotification;
}

export interface PostNotificationsResponse {
    code: number;
    info: string;
    chatNotification: ChatNotification;
}

export const postNotifications = async (notificationListId: string, data: PostNotificationsRequest): Promise<PostNotificationsResponse> => {
    const response = await apiClient.post<PostNotificationsResponse>(`/notifications/${notificationListId}`, data);
    return response.data;
}


// GET /joinRequests/{joinRequestListId}
export interface GetJoinRequestsRequest {
    fromUserId: string;
}

export interface GetJoinRequestsResponse {
    code: number;
    info: string;
    chatJoinRequestList: ChatJoinRequestList;
}

export const getJoinRequests = async (joinRequestListId: string, data: GetJoinRequestsRequest): Promise<GetJoinRequestsResponse> => {
    const response = await apiClient.get<GetJoinRequestsResponse>(`/joinRequests/${joinRequestListId}`, { params: data });
    return response.data;
}


// POST /joinRequests/{joinRequestListId}
export interface PostJoinRequestsRequest {
    fromUserId: string;
    chatJoinRequest: ChatJoinRequest;
}

export interface PostJoinRequestsResponse {
    code: number;
    info: string;
    chatJoinRequest: ChatJoinRequest;
}

export const postJoinRequests = async (joinRequestListId: string, data: PostJoinRequestsRequest): Promise<PostJoinRequestsResponse> => {
    const response = await apiClient.post<PostJoinRequestsResponse>(`/joinRequests/${joinRequestListId}`, data);
    return response.data;
}


// PATCH /joinRequests/{joinRequestListId}
export interface PatchJoinRequestsRequest {
    fromUserId: string;
    chatJoinRequest: ChatJoinRequest;
}

export interface PatchJoinRequestsResponse {
    code: number;
    info: string;
    chatJoinRequest: ChatJoinRequest;
}

export const patchJoinRequests = async (joinRequestListId: string, data: PatchJoinRequestsRequest): Promise<PatchJoinRequestsResponse> => {
    const response = await apiClient.patch<PatchJoinRequestsResponse>(`/joinRequests/${joinRequestListId}`, data);
    return response.data;
}