'use client';
import React from 'react';
import { Box, Tooltip, IconButton, Avatar, Menu, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { resetAuth } from '@/lib/features/auth/authSlice';
import UserProfileDrawer from '../chat/UserProfileDrawer';

function UserAvatar() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.auth.user);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [openDrawer, setOpenDrawer] = React.useState(false);
    const [openUnregisterDialog, setOpenUnregisterDialog] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {
        const headers = new Headers();
        headers.append("Authorization", token);

        const response = await fetch(`/api/logout`, {
            method: "POST",
            body: JSON.stringify({
                username: user.userName,
            }),
            headers: headers,
        });

        const data = await response.json();
        const code = Number(data.code);

        if (code === 200) {
            dispatch(resetAuth());
            router.push("/");
        }
        else {
            alert("Logout failed" + data.message);
        }
    };

    const handleUnregister = async () => {
        const headers = new Headers();
        headers.append("Authorization", token);

        const response = await fetch(`/api/unregister`, {
            method: "POST",
            body: JSON.stringify({
                username: user.userName,
                password: password,
            }),
            headers: headers,
        });

        const data = await response.json();
        const code = Number(data.code);

        if (code === 200) {
            dispatch(resetAuth());
            router.push("/");
        }
        else {
            alert("Unregister failed: " + data.message);
        }
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="" />
                </IconButton>
            </Tooltip>
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
                <MenuItem key="Profile" onClick={
                    () => {
                        setOpenDrawer(true);
                        handleCloseUserMenu();
                    }
                }>
                    <Typography sx={{ textAlign: 'center' }}>Profile</Typography>
                </MenuItem>
                <MenuItem key="Logout" onClick={() => {
                    handleLogout().catch((err) => {
                        alert("Logout failed: " + err);
                    });
                    handleCloseUserMenu();
                }}>
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                </MenuItem>
                <MenuItem key="Unregister" onClick={() => {
                    setOpenUnregisterDialog(true);
                    handleCloseUserMenu();
                }}>
                    <Typography sx={{ textAlign: 'center' }}>Unregister</Typography>
                </MenuItem>
            </Menu>
            <UserProfileDrawer open={openDrawer} onClose={() => setOpenDrawer(false)} />
            <Dialog
                open={openUnregisterDialog}
                onClose={() => setOpenUnregisterDialog(false)}
                aria-labelledby="unregister-dialog-title"
                aria-describedby="unregister-dialog-description"
            >
                <DialogTitle color='error' id="unregister-dialog-title">{"Confirm Unregister"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="unregister-dialog-description" >
                        To unregister, please enter your password to confirm.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="password"
                        label="Password"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    // error={invalidPassword}
                    // helperText={invalidPassword && "Incorrect password"}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenUnregisterDialog(false)}>Cancel</Button>
                    <Button color='error'
                        onClick={() => {
                            handleUnregister().catch((err) => {
                                alert("Unregister failed: " + err);
                            });
                            setOpenUnregisterDialog(false);
                        }}>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default UserAvatar;