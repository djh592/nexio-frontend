'use client';
import React, { useState, useRef, useEffect } from 'react';
import { IconButton, Popover, Paper, Stack, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Chat } from '@/lib/definitions';
import { getChatsSearch } from '@/lib/api';
import { upsertChats } from '@/lib/storage';
import GroupDisplayCard from '@/components/group/GroupDisplayCard';

export default function GroupSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<Chat[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const paperRef = useRef<HTMLFormElement>(null);

    const handleSearch = async () => {
        setAnchorEl(paperRef.current);
        if (searchTerm) {
            try {
                const response = await getChatsSearch({ searchText: searchTerm });
                if (response.code === 0) {
                    setSearchResults(response.chats);
                    upsertChats(response.chats);
                }
                else {
                    throw new Error(response.info);
                }
            }
            catch (error) {
                console.log('Error searching chats:', error);
            }
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSearchResults([]);
    };

    const [open, setOpen] = useState(false);
    const [id, setId] = useState(open ? 'search-popover' : undefined);

    useEffect(() => {
        setOpen(Boolean(anchorEl));
        setId(open ? 'search-popover' : undefined);
    }
        , [anchorEl, open]);

    return (
        <>
            <Paper
                component="form"
                sx={{ width: '100%', display: 'flex', alignItems: 'center' }}
                ref={paperRef}
            >
                <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search friends..."
                    inputProps={{ 'aria-label': 'search friends' }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <IconButton
                    type="button"
                    sx={{ p: '10px' }}
                    aria-label="search"
                    onClick={handleSearch}
                >
                    <SearchIcon />
                </IconButton>
            </Paper>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                slotProps={{
                    paper: {
                        style: {
                            width: paperRef.current ? paperRef.current.clientWidth : undefined,
                            maxHeight: '300px',
                            overflowY: 'auto',
                        },
                    },
                }}
            >
                <Stack sx={{ px: 1, py: 2 }}>
                    {searchResults.map((chat) => (
                        <GroupDisplayCard key={chat.chatId} chatId={chat.chatId} />
                    ))}
                </Stack>
            </Popover>
        </>
    );
}