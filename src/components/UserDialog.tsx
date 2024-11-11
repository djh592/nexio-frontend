'use client';
import React, { useState } from 'react';
import { Box, Avatar, Typography, Button, DialogActions, DialogContent, DialogTitle, Dialog } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import DeleteFriendDialog from '@/components/friend/DeleteFriendDialog';
import SendFriendRequestDialog from '@/components/friend/SendFriendRequestDialog';
import { User } from '@/lib/definitions';

interface UserDialogProps {
    user: User;
    open: boolean;
    onClose: () => void;
}

export default function UserDialog({ user, open, onClose }: UserDialogProps) {
    const router = useRouter();
    const currentUser = useAppSelector((state) => state.auth.user);
    const isFriend = useAppSelector((state) => state.friend.friends).some(friend => friend.userId === user.userId);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [sendRequestDialogOpen, setSendRequestDialogOpen] = useState(false);

    const handleEditProfile = () => {
        router.push('/account');
        onClose();
    };

    return (
        <>
            <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
                <DialogTitle>
                    <Typography variant="h6">User Information</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            alt={user.userName}
                            src={user.avatarUrl}
                            sx={{ width: 80, height: 80, mb: 2 }}
                        />
                        <Typography variant="h6">{user.userName}</Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
                            <Typography variant="body2">Email:</Typography>
                            <Typography variant="body2">{user.emailAddress}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 1 }}>
                            <Typography variant="body2">Phone:</Typography>
                            <Typography variant="body2">{user.phoneNumber}</Typography>
                        </Box>
                    </Box>
                </DialogContent>
                <DialogActions>
                    {currentUser.userId === user.userId && (
                        <Button variant="contained" color="primary" onClick={handleEditProfile}>
                            Edit Profile
                        </Button>
                    )}
                    {isFriend && currentUser.userId !== user.userId && (
                        <>
                            <Button variant="contained" color="secondary" onClick={() => setDeleteDialogOpen(true)}>
                                Delete Friend
                            </Button>
                            <DeleteFriendDialog
                                open={deleteDialogOpen}
                                user={user}
                                onClose={() => setDeleteDialogOpen(false)} />
                        </>
                    )}
                    {!isFriend && currentUser.userId !== user.userId && (
                        <>
                            <Button variant="contained" color="primary" onClick={() => setSendRequestDialogOpen(true)}>
                                Send Friend Request
                            </Button>
                            <SendFriendRequestDialog
                                open={sendRequestDialogOpen}
                                user={user}
                                onClose={() => setSendRequestDialogOpen(false)}
                            />
                        </>
                    )}
                </DialogActions>
            </Dialog>
        </>
    );
}