import { FriendGroups, ChatMessageList } from "@/lib/definitions";

// note: use try/catch block to handle errors
export const addFriendGroup = (friendGroups: FriendGroups, newGroupName: string): FriendGroups => {
    if (friendGroups.some(group => group.groupName === newGroupName)) {
        throw new Error("Group name already exists.");
    }
    return [...friendGroups, { groupName: newGroupName, friends: [] }];
};

// note: use try/catch block to handle errors
export const moveFriendToGroup = (
    friendGroups: FriendGroups,
    friendId: string,
    fromGroupName: string,
    toGroupName: string
): FriendGroups => {
    const fromGroup = friendGroups.find(group => group.groupName === fromGroupName);
    const toGroup = friendGroups.find(group => group.groupName === toGroupName);

    if (!fromGroup || !toGroup) {
        throw new Error("Both source and target groups must exist.");
    }

    const friendIndex = fromGroup.friends.findIndex(friend => friend.userId === friendId);
    if (friendIndex === -1) {
        throw new Error("Friend not found in the source group.");
    }

    const friend = fromGroup.friends[friendIndex];
    fromGroup.friends = fromGroup.friends.filter(f => f.userId !== friendId);
    toGroup.friends = [...toGroup.friends, friend];

    return [...friendGroups];
};


export const getUnreadMessageCount = (messageList: ChatMessageList, userId: string): number => {
    return messageList.messages.filter(
        message => message.meta.readBy.includes(userId) === false
    ).length;
}