'use client';
import React from 'react';
import { Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplyIcon from '@mui/icons-material/Reply';
import ForwardIcon from '@mui/icons-material/Forward';

interface MessageContextMenuProps {
    anchorReference: 'anchorPosition';
    anchorPosition: { top: number; left: number } | undefined;
    open: boolean;
    onClose: () => void;
    onWithdraw: () => void;
    onDelete: () => void;
    onReply: () => void;
    onForward: () => void;
}

export default function MessageContextMenu({
    anchorReference,
    anchorPosition,
    open,
    onClose,
    onWithdraw,
    onDelete,
    onReply,
    onForward,
}: MessageContextMenuProps) {
    return (
        <Menu
            anchorReference={anchorReference}
            anchorPosition={anchorPosition}
            open={open}
            onClose={onClose}
        >
            <MenuItem onClick={onWithdraw}>
                <ListItemIcon>
                    <UndoIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Withdraw" />
            </MenuItem>
            <MenuItem onClick={onDelete}>
                <ListItemIcon>
                    <DeleteIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Delete" />
            </MenuItem>
            <MenuItem onClick={onReply}>
                <ListItemIcon>
                    <ReplyIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Reply" />
            </MenuItem>
            <MenuItem onClick={onForward}>
                <ListItemIcon>
                    <ForwardIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Forward" />
            </MenuItem>
        </Menu>
    );
}