import { FriendGroups, FriendRequest, FriendRequestStatus } from '@/lib/definitions';

export const placeholderFriendGroups: FriendGroups = [
    {
        groupName: 'My Friends',
        friends: [
            {
                userId: '1',
                userName: 'Alice',
                emailAddress: 'alice@123.com',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
            {
                userId: '2',
                userName: 'Bob',
                emailAddress: '',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
            {
                userId: '3',
                userName: 'Charlie',
                emailAddress: '',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
        ],
    },
    {
        groupName: 'Family',
        friends: [
            {
                userId: '4',
                userName: 'David',
                emailAddress: '',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
            {
                userId: '5',
                userName: 'Eve',
                emailAddress: '',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
        ],
    },
    {
        groupName: 'Work',
        friends: [
            {
                userId: '6',
                userName: 'Frank',
                emailAddress: '',
                phoneNumber: '3241243241',
                avatarUrl: '',
            },
        ],
    },
];

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
