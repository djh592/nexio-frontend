'use client';
import React, { useState } from 'react';
import { Box, Avatar, Typography, Button, DialogActions, DialogContent, DialogTitle, Dialog, Divider, IconButton } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import DeleteFriendDialog from '@/components/friend/DeleteFriendDialog';
import SendFriendRequestDialog from '@/components/friend/SendFriendRequestDialog';
import { User } from '@/lib/definitions';
import EditIcon from '@mui/icons-material/Edit';

interface UserDialogProps {
    user: User;
    open: boolean;
    onClose: () => void;
}

export default function UserDialog({ user, open, onClose }: UserDialogProps) {
    const router = useRouter();
    const currentUser = useAppSelector((state) => state.auth.user);
    const friendGroups = useAppSelector((state) => state.friend.friendGroups);
    const isMe = currentUser.userId === user.userId;
    const isFriend = friendGroups.some((group) => group.friends.some((friend) => friend.userId === user.userId));
    const isOther = !isMe && !isFriend;
    const groupName = isFriend ? friendGroups.find((group) => group.friends.some((friend) => friend.userId === user.userId))?.groupName : null;

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
                            <Typography variant="body1">Email:</Typography>
                            <Typography variant="body1">{user.emailAddress || "UserEmail"}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mx: 3, my: 1 }}>
                            <Typography variant="body1">Phone:</Typography>
                            <Typography variant="body1">{user.phoneNumber || "UserPhone"}</Typography>
                        </Box>
                        {
                            // 展示 Friend Group 并且可以修改
                            groupName && (
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mx: 3, my: 1 }}>
                                    <Typography variant="body1">Group:</Typography>
                                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: "center" }}>
                                        <Typography variant="body1">{groupName}</Typography>
                                        <IconButton size="small" onClick={() => setDeleteDialogOpen(true)}>
                                            <EditIcon
                                                fontSize="small"
                                                color="primary"
                                            />
                                        </IconButton>
                                    </Box>
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
                                user={user}
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