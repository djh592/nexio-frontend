'use client';
import React, { useState, useRef } from 'react';
import { IconButton, Popover, Paper, Stack, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import UserDisplayCard from '@/components/UserDisplayCard';
import { User } from '@/lib/definitions';

export default function FriendSearch() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<User[]>([]);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const paperRef = useRef<HTMLFormElement>(null);

    const handleSearch = async () => {
        setAnchorEl(paperRef.current);
        setSearchResults([
            {
                userId: '1',
                userName: 'User1',
                emailAddress: '',
                phoneNumber: '',
                avatarUrl: '',
            },
            {
                userId: '2',
                userName: 'User2',
                emailAddress: '',
                phoneNumber: '',
                avatarUrl: '',
            },
            {
                userId: '3',
                userName: 'User3',
                emailAddress: '',
                phoneNumber: '',
                avatarUrl: '',
            },
            {
                userId: '4',
                userName: 'User4',
                emailAddress: '',
                phoneNumber: '',
                avatarUrl: '',
            },
            {
                userId: '5',
                userName: 'User5',
                emailAddress: '',
                phoneNumber: '',
                avatarUrl: '',
            },
            {
                userId: '6',
                userName: 'User6',
                emailAddress: '',
                phoneNumber: '',
                avatarUrl: '',
            },
            {
                userId: '7',
                userName: 'User7',
                emailAddress: '',
                phoneNumber: '',
                avatarUrl: '',
            },
            {
                userId: '8',
                userName: 'User8',
                emailAddress: '',
                phoneNumber: '',
                avatarUrl: '',
            },
            {
                userId: '9',
                userName: 'User9',
                emailAddress: '',
                phoneNumber: '',
                avatarUrl: '',
            },
            {
                userId: '10',
                userName: 'User10',
                emailAddress: '',
                phoneNumber: '',
                avatarUrl: '',
            },
        ]);
    };

    const handleClose = () => {
        // setSearchResults([]);
        setAnchorEl(null);
        
    };

    const open = Boolean(anchorEl);
    const id = open ? 'search-popover' : undefined;

    return (
        <>
            <Paper
                component="form"
                sx={{ width: '100%', display: 'flex', alignItems: 'center'}}
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
                PaperProps={{
                    style: {
                        width: paperRef.current ? paperRef.current.clientWidth : undefined,
                        maxHeight: '300px',
                        overflowY: 'auto',
                    },
                }}
            >
                <Stack sx={{ px: 1, py: 2 }}>
                    {searchResults.map((user) => (
                        <UserDisplayCard key={user.userId} user={user} />
                    ))}
                </Stack>
            </Popover>
        </>
    );
}