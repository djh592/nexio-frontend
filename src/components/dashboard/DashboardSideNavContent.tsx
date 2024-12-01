'use client';
import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCurrentUser } from '@/lib/hooks';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Box } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import ChatIcon from '@mui/icons-material/Chat';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import LogoutDialog from '@/components/auth/LogoutDialog';
import UserStack from '@/components/UserDisplayCard';

export const drawerWidth = 200;

export default function DashboardSideNavContent() {
    const { currentUser } = useCurrentUser();
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

    const handleNavigation = (path: string) => {
        const params = new URLSearchParams(searchParams);
        replace(`${path}?${params.toString()}`);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                whiteSpace: 'nowrap',
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    borderRight: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#f5f5f5',
                    position: 'fixed',
                },
            }}
        >
            <Toolbar />
            <UserStack userId={currentUser.userId} />
            <Divider
                sx={{
                    mb: 2,
                }}
            />
            <Box sx={{
                overflow: 'auto',
                height: '100%',
            }}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/chats')}>
                            <ListItemIcon>
                                <ChatIcon />
                            </ListItemIcon>
                            <ListItemText primary="Chats" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/friends')}>
                            <ListItemIcon>
                                <PersonIcon />
                            </ListItemIcon>
                            <ListItemText primary="Friends" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/groups')}>
                            <ListItemIcon>
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary="Groups" />
                        </ListItemButton>
                    </ListItem>
                    <Divider
                        sx={{
                            mt: 2,
                            mb: 2,
                        }}
                    />
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/account')}>
                            <ListItemIcon>
                                <AccountBoxIcon />
                            </ListItemIcon>
                            <ListItemText primary="Account" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/settings')}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/about')}>
                            <ListItemIcon>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText primary="About" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
            <Divider />
            <List>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                        setOpenLogoutDialog(true);
                    }}>
                        <ListItemIcon>
                            <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItemButton>
                </ListItem>
            </List>
            <LogoutDialog open={openLogoutDialog} onClose={() => setOpenLogoutDialog(false)} />
        </Drawer>
    );
};