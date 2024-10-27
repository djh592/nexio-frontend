import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Drawer, Box, Typography, IconButton, Avatar, InputAdornment, OutlinedInput, InputLabel, FormControl, ButtonBase } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setUser, setUserAvatar } from '@/lib/features/auth/authSlice';

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

interface UserProfileDrawerProps {
    open: boolean;
    onClose: () => void;
}

const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({ open, onClose }) => {
    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [formValues, setFormValues] = useState({
        username: user.userName,
        password: '',
        phone: user.phoneNumber,
        email: user.emailAddress,
        avatar: user.avatarUrl,
    });
    const [editableFields, setEditableFields] = useState({
        name: false,
        password: false,
        phone: false,
        email: false,
        avatar: false,
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
                    const response = await fetch('/api/', {
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

const handleSave = () => {
    // TODO：发送请求更新用户信息
    dispatch(setUser({
        ...user,
        userName: formValues.username,
        phoneNumber: formValues.phone,
        emailAddress: formValues.email,
        avatarUrl: formValues.avatar
    }));
    onClose();
};

return (
    <Drawer anchor="right" open={open} onClose={onClose}>
        <Box sx={{ width: 400, padding: 2 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>User Profile</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2, position: 'relative' }}>
                <Avatar
                    alt={formValues.username}
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
            </Box>
            <FormControl sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }} variant="outlined">
                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    defaultValue={user.userName}
                    label="Name"
                    value={formValues.username}
                    onChange={handleChange('username')}
                    fullWidth
                    disabled={!editableFields.name}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleEdit('name')}>
                                <EditIcon />
                            </IconButton>
                        </InputAdornment>}
                />
            </FormControl>
            <FormControl sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    label="Password"
                    type='password'
                    value={formValues.password}
                    onChange={handleChange('password')}
                    fullWidth
                    disabled={!editableFields.password}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleEdit('password')}>
                                <EditIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />

            </FormControl>
            <FormControl sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }} variant="outlined">
                <InputLabel htmlFor="component-outlined">Phone</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    defaultValue={user.phoneNumber}
                    label="Phone"
                    value={formValues.phone}
                    onChange={handleChange('phone')}
                    fullWidth
                    disabled={!editableFields.phone}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton onClick={() => handleEdit('phone')}>
                                <EditIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <FormControl sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }} variant="outlined">
                <InputLabel htmlFor="component-outlined">Phone</InputLabel>
                <OutlinedInput
                    id="component-outlined"
                    defaultValue={user.emailAddress}
                    label="Email"
                    value={formValues.email}
                    onChange={handleChange('email')}
                    fullWidth
                    disabled={!editableFields.email}
                    endAdornment={
                        <InputAdornment position="end" >
                            <IconButton onClick={() => handleEdit('email')}>
                                <EditIcon />
                            </IconButton>
                        </InputAdornment>
                    }
                />
            </FormControl>
            <LoadingButton
                fullWidth
                onClick={handleSave}
                loading={loading}
                loadingPosition="end"
                variant="contained"
            >
                Save
            </LoadingButton>
        </Box>
    </Drawer >
);
};

export default UserProfileDrawer;