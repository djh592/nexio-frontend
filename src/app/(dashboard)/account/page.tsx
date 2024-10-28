import AccountPageContents from '@/components/account/AccountPageContents';
import { Box, Paper } from '@mui/material';

export default function AccountPage() {
    return (
        <Box
        sx={{
            px: '2px',
            py: '1%',
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'cloumn',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
        <Paper
            variant="outlined"
            sx={{
                mx: '1%',
                my: '1%',
                height: '100%',
                width: '100%',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                overflowY: 'auto',
            }}
        >
            <AccountPageContents />
        </Paper>
    </Box>
    );
}