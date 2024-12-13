'use client';
import React, { Suspense } from 'react';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter, useSearchParams } from 'next/navigation';


export function BackButtonLoading() {
    return (
        <IconButton disabled aria-label="back">
            <ArrowBackIcon />
        </IconButton>
    );
}

interface BackButtonReadyProps {
    to: string;
}


export function BackButtonReady({ to }: BackButtonReadyProps) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();

    const handleNavigation = () => {
        const params = new URLSearchParams(searchParams);
        replace(`${to}?${params.toString()}`);
    };

    return (
        <IconButton onClick={handleNavigation} aria-label="back">
            <ArrowBackIcon />
        </IconButton>
    );
}


interface BackButtonProps {
    to: string;
}


export default function BackButton({ to }: BackButtonProps) {
    return (
        <Suspense fallback={<BackButtonLoading />}>
            <BackButtonReady to={to} />
        </Suspense>
    );
}