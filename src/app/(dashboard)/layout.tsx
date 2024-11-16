import DashboardAppBar from '@/components/dashboard/DashboardAppBar';
import DashboardSideNav from '@/components/dashboard/DashboardSideNav';
import { Box } from '@mui/material';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardAppBar />
            <DashboardSideNav />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '64px', // Adjust this value based on the height of your AppBar
                    marginLeft: '200px', // Adjust this value based on the width of your SideNav
                    height: 'calc(100vh - 64px)', // Adjust this value based on the height of your AppBar
                    overflowY: 'auto',
                }}
            >
                {children}
            </Box>
        </>
    );
}