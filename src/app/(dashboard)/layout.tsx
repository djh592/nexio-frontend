import DashboardAppBar from '@/components/dashboard/DashboardAppBar';
import DashboardSideNav from '@/components/dashboard/DashboardSideNav';
import { Box } from '@mui/material';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardAppBar />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '64px',
                }}
            >
                <DashboardSideNav />
                {children}
            </Box>
        </>
    );
}