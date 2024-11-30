'use client';
import React from 'react';
import { Button, useTheme } from '@mui/material';
import { useRouter } from 'next/navigation';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useCurrentUser } from '@/lib/hooks';

export default function LetsChatButton() {
    const router = useRouter();
    const theme = useTheme();
    const user = useCurrentUser();

    const handleClick = () => {
        if (user?.userId) {
            router.push('/chat');
        } else {
            router.push('/signin');
        }
    };

    return (
        <Button
            color="primary"
            sx={{
                mt: 2,
                height: '50px',
                width: '200px',
                backgroundColor: theme.palette.primary.light,
                color: '#fff',
                '&:hover': {
                    backgroundColor: theme.palette.primary.main,
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