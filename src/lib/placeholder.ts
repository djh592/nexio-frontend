import { FriendRequest, FriendRequestStatus } from '@/lib/definitions';
import { ChatParticipantList, ChatParticipantType } from './definitions';

export const placeholderSentRequests: FriendRequest[] = [
    {
        requestId: '1',
        createdAt: '2021-08-01T12:00:00Z',
        fromUserId: '7',
        toUserId: '1',
        status: 'Pending' as FriendRequestStatus,
    },
    {
        requestId: '2',
        createdAt: '2021-08-01T12:00:00Z',
        fromUserId: '8',
        toUserId: '1',
        status: 'Pending' as FriendRequestStatus,
    },
];

export const placeholderReceivedRequests: FriendRequest[] = [
    {
        requestId: '3',
        createdAt: '2021-08-01T12:00:00Z',
        fromUserId: '1',
        toUserId: '9',
        status: 'Pending' as FriendRequestStatus,
    },
    {
        requestId: '4',
        createdAt: '2021-08-01T12:00:00Z',
        fromUserId: '1',
        toUserId: '10',
        status: 'Pending' as FriendRequestStatus,
    },
];


export const placeholderChatParticipantList: ChatParticipantList = {
    participantListId: 'test-participant-list-id',
    participants: [
        { userId: '1', type: ChatParticipantType.Owner },
        { userId: '2', type: ChatParticipantType.Admin },
        { userId: '3', type: ChatParticipantType.Member },
        { userId: '4', type: ChatParticipantType.Member },
        { userId: '5', type: ChatParticipantType.Member },
        { userId: '6', type: ChatParticipantType.Member },
        { userId: '7', type: ChatParticipantType.Member },
        { userId: '8', type: ChatParticipantType.Member },
        { userId: '9', type: ChatParticipantType.Member },
        { userId: '10', type: ChatParticipantType.Member },
        { userId: '11', type: ChatParticipantType.Member },
        { userId: '12', type: ChatParticipantType.Member },
        { userId: '13', type: ChatParticipantType.Member },
        { userId: '14', type: ChatParticipantType.Member },
        { userId: '15', type: ChatParticipantType.Member },
        { userId: '16', type: ChatParticipantType.Member },
        { userId: '17', type: ChatParticipantType.Member },
        { userId: '18', type: ChatParticipantType.Member },
        { userId: '19', type: ChatParticipantType.Member },
        { userId: '20', type: ChatParticipantType.Member },
    ],
};