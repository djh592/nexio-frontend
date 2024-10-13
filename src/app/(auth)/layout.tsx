import { Box } from '@mui/material';
import AuthAppBar from '@/components/auth/AuthAppBar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AuthAppBar />
            <Box
                sx={{
                    height: '100%',
                    width: '100%',
                    marginTop: '2%',
                    display: 'flex',
                    flexDirection: 'cloumn',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>
        </>
    );
}