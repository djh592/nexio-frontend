'use client';
import React, { useState, useEffect, MouseEvent } from 'react';
import {
    Accordion, AccordionSummary, AccordionDetails,
    Box, Menu, MenuItem, ListItemIcon, ListItemText
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import UserDisplayCard from '@/components/user/UserDisplayCard';
import AddFriendGroupDialog from '@/components/friend/AddFriendGroupDialog';
import DeleteFriendGroupDialog from './DeleteFriendGroupDialog';
import { useCurrentUser } from '@/lib/hooks';
import { db } from '@/lib/db';
import { updateFriendGroups } from '@/lib/storage';
import { useLiveQuery } from 'dexie-react-hooks';


export default function FriendGroupList() {
    const { currentUser } = useCurrentUser();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
    const [addDialogOpen, setAddDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    useEffect(() => { updateFriendGroups(currentUser.userId) }, [currentUser.userId]);

    const friendGroups = useLiveQuery(() => db.friendGroups.toArray(),
        [currentUser, addDialogOpen, deleteDialogOpen, selectedGroup]);

    const handleRightClick = (event: MouseEvent<HTMLElement>, groupName: string) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setSelectedGroup(groupName);
    };

    const handleCloseMenu = () => {
        if(!anchorEl) return;
        setAnchorEl(null);
    };

    const handleAddGroup = () => {
        if(!friendGroups) return;
        setAddDialogOpen(true);
        handleCloseMenu();
    };

    const handleDeleteGroup = () => {
        if(!friendGroups) return;
        setDeleteDialogOpen(true);
        handleCloseMenu();
    };

    return (
        <Box sx={{ width: '100%' }}>
            {friendGroups && friendGroups.map((group) => (
                <Accordion
                    key={group.groupId}
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
                        {group.friends.map((friendUserId) => (
                            <Box key={friendUserId} sx={{ width: '100%' }}>
                                <UserDisplayCard userId={friendUserId} />
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
            <DeleteFriendGroupDialog
                groupName={selectedGroup || ''}
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
            />
        </Box>
    );
}