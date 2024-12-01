import { FriendRequest, FriendRequestStatus } from '@/lib/definitions';

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
