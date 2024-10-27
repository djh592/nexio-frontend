'use client';
import React from 'react';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Box } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SecurityIcon from '@mui/icons-material/Security';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import { useRouter } from 'next/navigation';

const drawerWidth = 240;

export default function DashboardSideNav() {
    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(path);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    borderRight: 'none',
                    borderTopRightRadius: 20,
                    boxSizing: 'border-box',
                    backgroundColor: '#f5f5f5'
                },
            }}
        >
            <Toolbar />
            <Box sx={{
                overflow: 'auto',
                height: '100%',
            }}>
                <List>
                    <ListItem
                        disablePadding
                        sx={{
                            mt: 2,
                        }}
                    >
                        <ListItemButton onClick={() => handleNavigation('/profile')}>
                            <ListItemIcon>
                                <AccountCircleIcon />
                            </ListItemIcon>
                            <ListItemText primary="Profile" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/security')}>
                            <ListItemIcon>
                                <SecurityIcon />
                            </ListItemIcon>
                            <ListItemText primary="Security" />
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
                    <Divider />
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
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                }} >
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => handleNavigation('/logout')}>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
};