'use client';
import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import AppBarUserAvatar from "@/components/dashboard/AppBarUserAvatar";
import { useCurrentUser } from "@/lib/hooks";

export default function DashboardAppBar() {
    const { currentUser } = useCurrentUser();

    return (
        <AppBar
            position="fixed"
            color="default"
            sx={{
                boxShadow: 'none',
                zIndex: (theme) => theme.zIndex.drawer + 1,
                top: 0,
                left: 0,
                right: 0,
            }}
        >
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link href="/">
                        <Image src="/nexio_trans_bg.png" alt="Nexio" width={125} height={50} priority />
                    </Link>
                </Box>{
                    currentUser.userId !== '' ?
                        <AppBarUserAvatar />
                        :
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
                }
            </Toolbar>
        </AppBar>
    );
}