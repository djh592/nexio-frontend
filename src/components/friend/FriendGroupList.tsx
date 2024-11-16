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
import { FriendGroups } from '@/lib/definitions';
import { useAppDispatch } from '@/lib/hooks';
import { removeFriendGroup } from '@/lib/features/friend/friendSlice';

interface FriendGroupListProps {
    friendGroups: FriendGroups;
}

export default function FriendGroupList({ friendGroups }: FriendGroupListProps) {
    const dispatch = useAppDispatch();
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

    const handleConfirmDeleteGroup = () => {
        if (selectedGroup) {
            dispatch(removeFriendGroup(selectedGroup));
            setDeleteDialogOpen(false);
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
                        <Typography variant="subtitle1">{group.groupName}</Typography>
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
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDeleteGroup} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}