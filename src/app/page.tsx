import React from 'react';
import { Box, Typography, Container } from '@mui/material';
import Image from 'next/image';
import AuthAppBar from '@/components/auth/AuthAppBar';
import LetsChatButton from '@/components/LetsChatButton';

export default function HomePage() {
  return (
    <>
      <AuthAppBar />
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Container
          maxWidth="md"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '5% auto',
            textAlign: 'center',
          }}
        >
          <Image src="/nexio_trans_bg.png" alt="Nexio" width={250} height={100} />
          <Typography variant="h2" sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}>
            Connect, Engage, Thrive
          </Typography>
          <Typography variant="h6" sx={{ margin: 4 }}>
            Welcome to Nexio, the platform that connects you with the world.
          </Typography>
          <Box sx={{ mt: 4 }}>
            <LetsChatButton />
          </Box>
        </Container>
      </Box>
    </>
  );
}