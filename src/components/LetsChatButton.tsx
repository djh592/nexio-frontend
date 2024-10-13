'use client';
import React from 'react';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';

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
      variant="contained"
      onClick={handleClick}
    >
      Let&apos;s Chat
    </Button>
  );
}