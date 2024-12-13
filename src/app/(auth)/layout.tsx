import { Box } from '@mui/material';
import DashboardAppBar from '@/components/dashboard/DashboardAppBar';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardAppBar />
            <Box sx={{ height: '60px', width: '100%', }} />
            <Box
                sx={{
                    height: '90%',
                    width: '100%',
                    marginTop: '2%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {children}
            </Box>
        </>
    );
}