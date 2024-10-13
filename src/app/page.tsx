import React from 'react';
import { Box, Button, Typography, Container, AppBar, Toolbar } from '@mui/material';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  return (
    <>
      <AppBar position="static" color="default" sx={{ boxShadow: 'none' }}>
        <Toolbar>
          <Link href="/">
            <Box sx={{ flexGrow: 1 }}>
              <Image src="/nexio_trans_bg.png" alt="Nexio" width={125} height={50} />
            </Box>
          </Link>
        </Toolbar>
      </AppBar>
      <Container
        maxWidth="md"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          mt: 8,
          textAlign: 'center',
        }}
      >
        <Image src="/nexio_trans_bg.png" alt="Nexio" width={250} height={100} />
        <Typography variant="h2" sx={{ mt: 2, mb: 4, fontWeight: 'bold' }}>
          Connect, Engage, Thrive
        </Typography>
        <Typography variant="h6" sx={{ mb: 6 }}>
          Welcome to Nexio, the platform that connects you with the world.
        </Typography>
        <Box>
          <Link href="/signin" passHref>
            <Button color="primary" variant="outlined" sx={{ mr: 2 }}>
              Sign In
            </Button>
          </Link>
          <Link href="/signup" passHref>
            <Button color="primary" variant="contained">
              Sign Up
            </Button>
          </Link>
        </Box>
      </Container>
    </>
  );
}