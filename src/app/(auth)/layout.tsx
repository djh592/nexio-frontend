import { Box } from '@mui/material';
import DashboardAppBar from '@/components/dashboard/DashboardAppBar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardAppBar />
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