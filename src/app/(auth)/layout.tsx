import Image from 'next/image';
import Link from 'next/link';
import { AppBar, Box } from '@mui/material';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <AppBar
                position="static"
                color="default"
                sx={{
                    display: 'flex',
                    boxShadow: 'none',
                }}
            >
                <Link href="/">
                    <Box sx={{ pl: 2, pt: 1, }}>
                        <Image src="/nexio_trans_bg.png" alt="Nexio" width={125} height={50} />
                    </Box>
                </Link>
            </AppBar>
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