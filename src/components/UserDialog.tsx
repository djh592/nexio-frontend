'use client';
import React from 'react';
import { Box, Avatar, Typography, Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import DeleteFriendDialog from './friend/DeleteFriendDialog';
import SendFriendRequestDialog from './friend/SendFriendRequestDialog';
import { User } from '@/lib/definitions';

interface UserDialogProps {
    user: User;
    onClose: () => void;
}

export default function UserDialog({ user, onClose }: UserDialogProps) {
    const router = useRouter();
    const currentUser = useAppSelector((state) => state.auth.user);
    const isFriend = useAppSelector((state) => state.friends.friends).some(friend => friend.userId === user.userId);

    const handleEditProfile = () => {
        router.push('/account');
        onClose();
    };

    return (
        <>
            <DialogTitle>
                <Typography variant="h6">User Information</Typography>
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar
                        alt={user.userName}
                        src={user.avatarUrl}
                        sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                        <Typography variant="h6">{user.userName}</Typography>
                        <Typography variant="body2">{user.emailAddress}</Typography>
                        <Typography variant="body2">{user.phoneNumber}</Typography>
                    </Box>
                </Box>
                {currentUser.userId === user.userId && (
                    <Button variant="contained" color="primary" onClick={handleEditProfile}>
                        Edit Profile
                    </Button>
                )}
                {isFriend && currentUser.userId !== user.userId && (
                    <DeleteFriendDialog user={user} onClose={onClose} />
                )}
                {!isFriend && currentUser.userId !== user.userId && (
                    <SendFriendRequestDialog user={user} onClose={onClose} />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Close
                </Button>
            </DialogActions>
        </>
    );
}