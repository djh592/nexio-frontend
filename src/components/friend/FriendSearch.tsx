'use client';
import React, { useState, useRef } from 'react';
import { IconButton, Popover, Paper, Stack, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UserDisplayCard from '@/components/UserDisplayCard';
import { User } from '@/lib/definitions';
import { getUsersSearch } from '@/lib/api';

export default function FriendSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const paperRef = useRef<HTMLFormElement>(null);

    const handleSearch = async () => {
        setAnchorEl(paperRef.current);
        if (searchTerm) {
            try {
                const response = await getUsersSearch({ searchText: searchTerm });
                if (response.code === 0) {
                    setSearchResults(response.users);
                }
                else {
                    throw new Error(response.info);
                }
            }
            catch (error) {
                console.log('Error searching users:', error);
            }
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSearchResults([]);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'search-popover' : undefined;

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
                    {searchResults.map((user) => (
                        <UserDisplayCard key={user.userId} userId={user.userId} />
                    ))}
                </Stack>
            </Popover>
        </>
    );
}