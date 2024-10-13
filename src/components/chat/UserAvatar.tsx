'use client';
import React from "react";
import { Avatar, Box, IconButton, Menu, MenuItem, Tooltip, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setToken, setUser } from "@/lib/features/auth/authSlice";

export default function UserAvatar() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const user = useAppSelector((state) => state.auth.user);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

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
                username: user.name,
            }),
            headers: headers,
        });

        const data = await response.json();
        const code = Number(data.code);

        if (code === 200) {
            dispatch(setToken(""));
            dispatch(setUser({
                id: "",
                name: "",
                password: "",
                email: "",
                phone: "",
                avatar: "",
            }));
            router.push("/");
        }
        else {
            alert("Logout failed" + data.message);
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
                <MenuItem key="Profile" onClick={handleCloseUserMenu}>
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
                <MenuItem key="Unregister" onClick={handleCloseUserMenu}>
                    <Typography sx={{ textAlign: 'Unregister' }}>Profile</Typography>
                </MenuItem>
            </Menu>
        </Box>
    );
}