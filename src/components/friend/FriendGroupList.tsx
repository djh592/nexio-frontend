'use client';
import React, { useState, MouseEvent } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Typography, Box, Menu, MenuItem, Dialog,
    DialogTitle, DialogContent, DialogActions,
    Button, ListItemIcon, ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UserDisplayCard from '@/components/UserDisplayCard';
import AddFriendGroupDialog from '@/components/friend/AddFriendGroupDialog';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { removeFriendGroup } from '@/lib/features/friend/friendSlice';


export default function FriendGroupList() {
    const dispatch = useAppDispatch();
    const token = useAppSelector((state) => state.auth.token);
    const userId = useAppSelector((state) => state.auth.user.userId);
    const friendGroups = useAppSelector((state) => state.friend.friendGroups);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleRightClick = (event: MouseEvent<HTMLElement>, groupName: string) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setSelectedGroup(groupName);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleAddGroup = () => {
        setAddDialogOpen(true);
        handleCloseMenu();
    };

    const handleDeleteGroup = () => {
        setDeleteDialogOpen(true);
        handleCloseMenu();
    };

    const handleConfirmDeleteGroup = async () => {
        if (selectedGroup) {
            try {
                const headers = new Headers();
                headers.append("Authorization", token);
                const response = await fetch('/api/friends/groups', {
                    method: 'DELETE',
                    headers: headers,
                    body: JSON.stringify({
                        userId: userId,
                        groupName: selectedGroup,
                    }),
                });
                if (response.ok) {
                    dispatch(removeFriendGroup(selectedGroup));
                    setDeleteDialogOpen(false);
                }
                else {
                    const data = await response.json();
                    console.log('Failed to delete friend group:', data.message);
                }
            }
            catch (error) {
                console.log('Failed to delete friend group:', error);
            }
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {friendGroups.map((group) => (
                <Accordion
                    key={group.groupName}
                    sx={{ boxShadow: 'none', border: 'none' }}
                    onContextMenu={(event) => handleRightClick(event, group.groupName)}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`${group.groupName}-content`}
                        id={`${group.groupName}-header`}
                    >
                        {group.groupName}
                    </AccordionSummary>
                    <AccordionDetails sx={{ padding: 0 }}>
                        {group.friends.map((friend) => (
                            <Box key={friend.userId} sx={{ width: '100%' }}>
                                <UserDisplayCard user={friend} />
                            </Box>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem onClick={handleAddGroup}>
                    <ListItemIcon>
                        <AddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Add Group" />
                </MenuItem>
                <MenuItem onClick={handleDeleteGroup}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete Group" />
                </MenuItem>
            </Menu>
            <AddFriendGroupDialog
                open={addDialogOpen}
                onClose={() => setAddDialogOpen(false)}
            />
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>{`Are you sure you want to delete the group "${selectedGroup}"?`}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDeleteGroup} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}