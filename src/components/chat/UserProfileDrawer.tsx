import React from 'react';
import { Drawer, Box, Typography, TextField, Button, IconButton, Avatar } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { setUser } from '@/lib/features/auth/authSlice';

interface UserProfileDrawerProps {
    open: boolean;
    onClose: () => void;
}

const UserProfileDrawer: React.FC<UserProfileDrawerProps> = ({ open, onClose }) => {
    const user = useAppSelector((state) => state.auth.user);
    const dispatch = useAppDispatch();
    const [formValues, setFormValues] = React.useState(user);
    const [editableFields, setEditableFields] = React.useState({
        name: false,
        email: false,
        phone: false,
        avatar: false,
    });

    const handleChange = (prop: keyof typeof formValues) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormValues({ ...formValues, [prop]: event.target.value });
    };

    const handleEdit = (field: keyof typeof editableFields) => {
        setEditableFields({ ...editableFields, [field]: true });
    };

    const handleSave = () => {
        // TODO：发送请求更新用户信息
        dispatch(setUser(formValues));
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box sx={{ width: 400, padding: 2 }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>User Profile</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <Avatar alt={formValues.name} src={formValues.avatar} sx={{ marginRight: 2 }} />
                    <TextField
                        label="Avatar URL"
                        variant="outlined"
                        value={formValues.avatar}
                        onChange={handleChange('avatar')}
                        fullWidth
                        disabled={!editableFields.avatar}
                    />
                    <IconButton onClick={() => handleEdit('avatar')}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={formValues.name}
                        onChange={handleChange('name')}
                        fullWidth
                        disabled={!editableFields.name}
                    />
                    <IconButton onClick={() => handleEdit('name')}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={formValues.email}
                        onChange={handleChange('email')}
                        fullWidth
                        disabled={!editableFields.email}
                    />
                    <IconButton onClick={() => handleEdit('email')}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                    <TextField
                        label="Phone"
                        variant="outlined"
                        value={formValues.phone}
                        onChange={handleChange('phone')}
                        fullWidth
                        disabled={!editableFields.phone}
                    />
                    <IconButton onClick={() => handleEdit('phone')}>
                        <EditIcon />
                    </IconButton>
                </Box>
                <Button variant="contained" color="primary" onClick={handleSave} fullWidth>
                    Save
                </Button>
            </Box>
        </Drawer>
    );
};

export default UserProfileDrawer;