'use client';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Avatar, Button, Typography, OutlinedInput, InputAdornment, IconButton, Stack, Divider, ButtonBase } from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setUser, setUserAvatar } from '@/lib/features/auth/authSlice';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

export default function AccountPageContent() {
    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [formValues, setFormValues] = useState({
        username: user.userName,
        phone: user.phoneNumber,
        email: user.emailAddress,
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [editableFields, setEditableFields] = useState({
        username: false,
        phone: false,
        email: false,
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (prop: keyof typeof formValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleEdit = (field: keyof typeof editableFields) => {
        setEditableFields({ ...editableFields, [field]: true });
    };

    const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = async () => {
                const base64String = reader.result as string;

                const headers = new Headers();
                headers.append("Authorization", token);
                const data = {
                    userId: user.userId,
                    newProfile: {
                        avatarImage: base64String
                    }
                };

                try {
                    setLoading(true);
                    const response = await fetch(`/api/user/${user.userId}`, {
                        method: 'POST',
                        headers,
                        body: JSON.stringify(data),
                    });

                    if (response.ok) {
                        const responseData = await response.json();
                        dispatch(setUserAvatar(
                            responseData.data.avatarUrl
                        ));
                    } else {
                        console.error('Failed to upload avatar');
                    }
                } catch (error) {
                    console.error('Error uploading avatar:', error);
                } finally {
                    setLoading(false);
                }
            };
            reader.readAsDataURL(file);
        }
    };

    const saveProfileChanges = async () => {
        setLoading(true);
        const headers = new Headers();
        headers.append("Authorization", token);
        try {
            const response = await fetch(`/api/user/${user.userId}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    phoneNumber: formValues.phone,
                    emailAddress: formValues.email,
                }),
            });
            if (response.ok) {
                const responseData = await response.json();
                const newProfile = responseData.user;
                dispatch(setUser({
                    ...user,
                    userName: newProfile.userName,
                    phoneNumber: newProfile.phoneNumber,
                    emailAddress: newProfile.emailAddress,
                    avatarUrl: newProfile.avatarUrl,
                }));
                setEditableFields({ username: false, phone: false, email: false });
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const savePasswordChanges = async () => {
        setLoading(true);
        const headers = new Headers();
        headers.append("Authorization", token);
        try {
            const response = await fetch(`/api/user/${user.userId}`, {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    oldPassword: formValues.oldPassword,
                    newPassword: formValues.newPassword,
                }),
            });
            if (response.ok) {
                const responseData = await response.json();
                const newProfile = responseData.user;
                dispatch(setUser({
                    ...user,
                    userName: newProfile.userName,
                    phoneNumber: newProfile.phoneNumber,
                    emailAddress: newProfile.emailAddress,
                    avatarUrl: newProfile.avatarUrl,
                }));
                setEditableFields({ username: false, phone: false, email: false });
            } else {
                console.error('Failed to update password');
            }
        } catch (error) {
            console.error('Error updating password:', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <Box sx={{ padding: 4 }}>
            <Box
                sx={{
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative'
                }}
            >
                <Avatar
                    alt={user.userName}
                    src={user.avatarUrl}
                    sx={{
                        width: 80,
                        height: 80,
                    }}
                >
                    <ButtonBase
                        component="label"
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            opacity: 0,
                            '&:hover': {
                                opacity: 1,
                            },
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                        }}
                    >
                        <EditIcon />
                        <VisuallyHiddenInput
                            type="file"
                            onChange={uploadAvatar}
                            multiple
                        />
                    </ButtonBase>
                </Avatar>
                <Box sx={{ marginLeft: 3 }}>
                    <Typography variant="h4">
                        {user.userName || 'User Name'}
                    </Typography>
                </Box>
                <IconButton >
                    <EditIcon />
                </IconButton>
            </Box>
            <Divider sx={{ marginBottom: 2 }} />
            <Stack spacing={2}>
                <Typography variant="h6">Personal Info</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    <Typography variant="body1" sx={{ width: '40%' }}>Phone:</Typography>
                    <OutlinedInput
                        fullWidth
                        defaultValue={formValues.phone || user.phoneNumber || 'Phone Number'}
                        onChange={handleChange('phone')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleEdit('phone')}>
                                    <EditIcon />
                                </IconButton>
                            </InputAdornment>

                        }
                        disabled={!editableFields.phone}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    <Typography variant="body1" sx={{ width: '40%' }}>Email:</Typography>
                    <OutlinedInput
                        fullWidth
                        defaultValue={formValues.email || user.emailAddress || 'Email Address'}
                        onChange={handleChange('email')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={() => handleEdit('email')}>
                                    <EditIcon />
                                </IconButton>
                            </InputAdornment>
                        }
                        disabled={!editableFields.email}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={saveProfileChanges}
                        disabled={loading}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Stack spacing={2}>
                <Typography variant="h6">Security</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    <Typography variant="body1" sx={{ width: '40%' }}>Old Password:</Typography>
                    <OutlinedInput
                        fullWidth
                        type="password"
                        value={formValues.oldPassword}
                        placeholder="Old Password"
                        onChange={handleChange('oldPassword')}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    <Typography variant="body1" sx={{ width: '40%' }}>New Password:</Typography>
                    <OutlinedInput
                        fullWidth
                        type="password"
                        value={formValues.newPassword}
                        placeholder="New Password"
                        onChange={handleChange('newPassword')}
                    />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', my: 1 }}>
                    <Typography variant="body1" sx={{ width: '40%' }}>Confirm Password:</Typography>
                    <OutlinedInput
                        fullWidth
                        type="password"
                        value={formValues.confirmPassword}
                        placeholder="Confirm Password"
                        onChange={handleChange('confirmPassword')}
                    />
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', my: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<SaveIcon />}
                        onClick={savePasswordChanges}
                        disabled={loading}
                    >
                        Save Changes
                    </Button>
                </Box>
            </Stack>
        </Box >
    );
}