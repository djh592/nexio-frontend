'use client';
import React from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
    to: string;
}

export default function BackButton({ to }: BackButtonProps) {
    const router = useRouter();

    const handleClick = () => {
        router.push(to);
    };

    return (
        <IconButton onClick={handleClick} aria-label="back">
            <ArrowBackIcon />
        </IconButton>
    );
}