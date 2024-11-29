'use client';
import React, { useState } from 'react';
import { Box, Avatar, Typography, Button, DialogActions, DialogContent, DialogTitle, Dialog, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { User } from '@/lib/definitions';
import { db } from '@/lib/db';
import { useLiveQuery } from 'dexie-react-hooks';
import DeleteFriendDialog from '@/components/friend/DeleteFriendDialog';
import SendFriendRequestDialog from '@/components/friend/SendFriendRequestDialog';
import FriendGroupSelect from '@/components/friend/FriendGroupSelect';

interface UserDialogProps {
    user: User;
    open: boolean;
    onClose: () => void;
}

export default function UserDisplayDialog({ user, open, onClose }: UserDialogProps) {
    const router = useRouter();
    const me = useAppSelector((state) => state.auth.user);
    const friendGroups = useLiveQuery(() => db.friendGroups.toArray(), []);
    const isMe = me.userId === user.userId;
    const isFriend = friendGroups?.some((group) => group.friends.some((friend) => friend.userId === user.userId)) ?? false;
    const isOther = !isMe && !isFriend;
    const groupName = isFriend ? friendGroups?.find((group) => group.friends.some((friend) => friend.userId === user.userId))?.groupName : undefined;

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
                            alt={user.userName}
                            src={user.avatarUrl}
                            sx={{ width: 80, height: 80, mb: 2 }}
                        />
                        <Typography variant="h6">{user.userName || "UserName"}</Typography>
                        <Divider sx={{ width: '100%', my: 2 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mx: 3, my: 1 }}>
                            <Typography variant="body1" >Email:</Typography>
                            <Typography variant="body1" >{user.emailAddress || "UserEmail"}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mx: 3, my: 1 }}>
                            <Typography variant="body1">Phone:</Typography>
                            <Typography variant="body1">{user.phoneNumber || "UserPhone"}</Typography>
                        </Box>
                        {
                            groupName && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mx: 3, my: 1 }}>
                                    <Typography variant="body1">Group:</Typography>
                                    <FriendGroupSelect
                                        friend={user}
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
                            <DeleteFriendDialog
                                open={deleteDialogOpen}
                                friend={user}
                                onClose={() => setDeleteDialogOpen(false)}
                            />
                        </>
                    )}
                    {isOther && (
                        <>
                            <Button variant="contained" color="primary" onClick={() => setSendRequestDialogOpen(true)}>
                                Send Friend Request
                            </Button>
                            <SendFriendRequestDialog
                                open={sendRequestDialogOpen}
                                toUser={user}
                                onClose={() => setSendRequestDialogOpen(false)}
                            />
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}