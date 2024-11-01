'use client';
import React, { useState } from 'react';
import { Box, IconButton, Avatar, Menu, MenuItem, Typography, Divider } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import LogoutDialog from '../auth/LogoutDialog';
import LogoutIcon from '@mui/icons-material/Logout';

export default function AppbarUserAvatar() {
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);
    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                    alt={user.userName}
                    src={user.avatarUrl}
                    sx={{ width: 40, height: 40 }}
                />
            </IconButton>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
                <MenuItem
                    key="Profile"
                    onClick={() => {
                        router.push("/account");
                        handleCloseUserMenu();
                    }}
                >
                    <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                </MenuItem>
                <MenuItem
                    key="Settings"
                    onClick={() => {
                        router.push("/settings");
                        handleCloseUserMenu();
                    }}
                >
                    <Typography sx={{ textAlign: 'center' }}>Settings</Typography>
                </MenuItem>
                <Divider />
                <MenuItem
                    key="Logout"
                    onClick={() => {
                        setOpenLogoutDialog(true);
                        handleCloseUserMenu();
                    }}
                >
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                    <LogoutIcon sx={{ ml: 2 }} />
                </MenuItem>
            </Menu>
            <LogoutDialog
                open={openLogoutDialog}
                onClose={() => setOpenLogoutDialog(false)}
            />
        </Box >
    );
}