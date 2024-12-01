import { Users, ResponseFriendGroup, ResponseFriendGroups, FriendGroup, FriendGroups, ChatMessageList } from "@/lib/definitions";

export const decomposeResponseFriendGroup = (responseFriendGroup: ResponseFriendGroup): { friendGroup: FriendGroup, users: Users } => {
    const groupId = responseFriendGroup.groupId;
    const groupName = responseFriendGroup.groupName;
    const groupUsers = responseFriendGroup.friends;
    const groupUserIds = groupUsers.map(user => user.userId);
    const friendGroup = { groupId, groupName, friends: groupUserIds };
    return { friendGroup, users: groupUsers };
}

export const decomposeResponseFriendGroups = (responseFriendGroups: ResponseFriendGroups): { friendGroups: FriendGroups, users: Users } => {
    const friendGroups: FriendGroups = [];
    const users: Users = [];
    responseFriendGroups.forEach(responseFriendGroup => {
        const groupId = responseFriendGroup.groupId;
        const groupName = responseFriendGroup.groupName;
        const groupUsers = responseFriendGroup.friends;
        const groupUserIds = groupUsers.map(user => user.userId);
        friendGroups.push({ groupId, groupName, friends: groupUserIds });
        users.push(...groupUsers);
    });
    return { friendGroups, users };
}

export const getUnreadMessageCount = (messageList: ChatMessageList, userId: string): number => {
    return messageList.messages.filter(
        message => message.meta.readBy.includes(userId) === false
    ).length;
}