'use client';
import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetAuth } from '@/lib/features/auth/authSlice';
import { useRouter } from 'next/navigation';

interface UnregisterDialogLogoutDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function UnregisterDialog(
    { open, onClose }: UnregisterDialogLogoutDialogProps
) {
    const user = useAppSelector((state) => state.auth.user);
    const token = useAppSelector((state) => state.auth.token);
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleDeleteAccount = async () => {
        setLoading(true);
        try {
            const headers = new Headers();
            headers.append("Authorization", token);
            const response = await fetch('/api/unregister', {
                method: 'DELETE',
                headers: headers,
                body: JSON.stringify({
                    userId: user.userId,
                    password: password,
                }),
            });
            if (response.ok) {
                dispatch(resetAuth());
                router.push('/');
            } else {
                const data = await response.json();
                alert("Failed to delete account: " + data.message);
            }
        } catch (error) {
            alert("Failed to delete account: " + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="delete-account-dialog-title"
            aria-describedby="delete-account-dialog-description"
            maxWidth="sm"
            fullWidth
        >
            <DialogTitle id="delete-account-dialog-title">
                <Typography variant="h6" color="error">{"Confirm Delete Account"}</Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="delete-account-dialog-description">
                    To delete your account, please enter your password to confirm.
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button
                    onClick={handleDeleteAccount}
                    color="error"
                    variant="contained"
                    disabled={loading}
                >
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
}
