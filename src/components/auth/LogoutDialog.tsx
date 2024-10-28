'use client';
import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetAuth } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

interface LogoutDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function LogoutDialog({ open, onClose }: LogoutDialogProps) {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const token = useAppSelector((state) => state.auth.token);

    const handleLogout = async () => {
        try {
            const headers = new Headers();
            headers.append("Authorization", token);
            const response = await fetch('/api/logout', {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify({
                    "userId": user.userId,
                }),
            });
            if (response.ok) {
                dispatch(resetAuth());
                router.push('/');
            } else {
                const data = await response.json();
                alert("Logout failed: " + data.message);
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
                <Typography variant="h6" color="error">{"Confirm Logout"}</Typography>
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

