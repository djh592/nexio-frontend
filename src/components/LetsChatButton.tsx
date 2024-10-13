'use client';
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function LetsChatButton() {
    const router = useRouter();
    const user = useAppSelector((state) => state.auth.user);

    const handleClick = () => {
        if (user && user.id) {
            router.push('/chat');
        } else {
            router.push('/signin');
        }
    };

    return (
        <Button
            color="primary"
            sx={{
                mt: 1,
                height: '50px',
                width: '200px',
                backgroundColor: '#1976d2',
                color: '#fff',
                '&:hover': {
                    backgroundColor: '#1565c0',
                },
                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 'bold',
            }}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            onClick={handleClick}
        >
            Let&apos;s Chat
        </Button>
    );
}