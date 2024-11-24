'use client';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetAuth } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import { deleteLogout } from '@/lib/api';

interface LogoutDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function LogoutDialog({ open, onClose }: LogoutDialogProps) {
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.auth.user);
    const router = useRouter();


    const handleLogout = async () => {
        try {
            const response = await deleteLogout({ userId: user.userId });
            if (response.code === 0) {
                dispatch(resetAuth());
                router.push('/');
            } else {
                throw new Error(response.info);
            }
        } catch (error) {
            alert("Logout failed: " + error);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="logout-dialog-title"
            aria-describedby="logout-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="logout-dialog-title">
                Confirm Logout
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="logout-dialog-description">
                    Are you sure you want to logout?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={() => {
                        handleLogout().catch((err) => {
                            alert("Logout failed: " + err);
                        });
                        onClose();
                    }}
                    color="error"
                    variant="contained"
                >
                    Logout
                </Button>
            </DialogActions>
        </Dialog>
    );
};

