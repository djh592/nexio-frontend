'use client';
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import UnregisterDialog from './UnregisterDialog';

export default function SettingsPageContent() {
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    return (
        <Box sx={{ padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Settings
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 4 }}>
                <Typography variant="h6" color="error" sx={{ width: '40%' }}>
                    Delete Account
                </Typography>
                <Typography variant="body1" color="textSecondary" sx={{ width: '60%' }}>
                    Permanently delete this account.
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', marginTop: 2 }}>
                <Box sx={{ width: '40%' }} />
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setOpenDeleteDialog(true)}
                >
                    Delete Account
                </Button>
            </Box>
            <UnregisterDialog
                open={openDeleteDialog}
                onClose={() => setOpenDeleteDialog(false)}
            />
        </Box>
    );
}