'use client';
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Divider, Box, Skeleton } from '@mui/material';

export const drawerWidth = 200;

export default function DashboardSideNavSkeleton() {
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
            <Box sx={{ padding: 2 }}>
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="text" width="80%" height={20} sx={{ mt: 1 }} />
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ overflow: 'auto', height: '100%' }}>
                <List>
                    {Array.from(new Array(5)).map((_, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Skeleton variant="circular" width={24} height={24} />
                                </ListItemIcon>
                                <ListItemText primary={<Skeleton variant="text" width="80%" />} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ mt: 2, mb: 2 }} />
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <Skeleton variant="circular" width={24} height={24} />
                            </ListItemIcon>
                            <ListItemText primary={<Skeleton variant="text" width="80%" />} />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    );
}