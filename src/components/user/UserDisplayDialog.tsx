'use client';
import React, { useState, useEffect } from 'react';
import { Box, Avatar, Typography, Button, DialogActions, DialogContent, DialogTitle, Dialog, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCurrentUser } from '@/lib/hooks';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import DeleteFriendDialog from '@/components/friend/DeleteFriendDialog';
import SendFriendRequestDialog from '@/components/friend/SendFriendRequestDialog';
import FriendGroupSelect from '@/components/friend/FriendGroupSelect';
import FriendChatButton from '@/components/friend/FriendChatButton';

interface UserDialogProps {
    userId: string;
    open: boolean;
    onClose: () => void;
}

export default function UserDisplayDialog({ userId, open, onClose }: UserDialogProps) {
    const router = useRouter();
    const { currentUser } = useCurrentUser();
    const user = useLiveQuery(() => db.users.where('userId').equals(userId).first(), [userId]);
    const friendGroups = useLiveQuery(() => db.friendGroups.toArray(), []);

    const [isMe, setIsMe] = useState(false);
    const [isFriend, setIsFriend] = useState(false);
    const [isOther, setIsOther] = useState(false);
    const [groupName, setGroupName] = useState<string | undefined>(undefined);

    useEffect(() => {
        const me = currentUser.userId === user?.userId;
        const friend = friendGroups?.some((group) => group.friends.some((friendUserId) => friendUserId === user?.userId)) ?? false;
        const other = !me && !friend;
        const group = friend ? friendGroups?.find((group) => group.friends.some((friendUserId) => friendUserId === user?.userId))?.groupName : undefined;

        setIsMe(me);
        setIsFriend(friend);
        setIsOther(other);
        setGroupName(group);
    }, [currentUser.userId, user, friendGroups]);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [sendRequestDialogOpen, setSendRequestDialogOpen] = useState(false);

    const handleEditProfile = () => {
        router.push('/account');
        onClose();
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth
                sx={{
                    '& .MuiDialog-paper': {
                        width: '100%',
                        maxWidth: '500px',
                        borderRadius: '16px',
                        margin: 'auto',
                        padding: '16px',
                    },
                    overflowY: 'auto',
                }}
            >
                <DialogTitle>
                    User Information
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            alt={user?.userName}
                            src={user?.avatarUrl}
                            sx={{ width: 80, height: 80, mb: 2 }}
                        />
                        <Typography variant="h6">{user?.userName || "UserName"}</Typography>
                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mx: 3, my: 1 }}>
                            <Typography variant="body1" >Email:</Typography>
                            <Typography variant="body1" >{user?.emailAddress || "UserEmail"}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mx: 3, my: 1 }}>
                            <Typography variant="body1">Phone:</Typography>
                            <Typography variant="body1">{user?.phoneNumber || "UserPhone"}</Typography>
                        </Box>
                        {
                            groupName && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mx: 3, my: 1 }}>
                                    <Typography variant="body1">Group:</Typography>
                                    <FriendGroupSelect
                                        friendUserId={user?.userId || ''}
                                    />
                                </Box>
                            )
                        }
                    </Box>
                </DialogContent>
                <DialogActions>
                    {isMe && (
                        <Button variant="contained" color="primary" onClick={handleEditProfile}>
                            Edit Profile
                        </Button>
                    )}
                    {isFriend && (
                        <>
                            <Button variant="contained" color="secondary" onClick={() => setDeleteDialogOpen(true)}>
                                Delete Friend
                            </Button>
                            {
                                user &&
                                <DeleteFriendDialog
                                    open={deleteDialogOpen}
                                    friendUserId={user.userId}
                                    onClose={() => setDeleteDialogOpen(false)}
                                />
                            }
                            <FriendChatButton friendUserId={user?.userId || ''} />
                        </>
                    )}
                    {isOther && (
                        <>
                            <Button variant="contained" color="primary" onClick={() => setSendRequestDialogOpen(true)}>
                                Send Friend Request
                            </Button>
                            {
                                user &&
                                <SendFriendRequestDialog
                                    open={sendRequestDialogOpen}
                                    toUserId={user.userId}
                                    onClose={() => setSendRequestDialogOpen(false)}
                                />
                            }
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}