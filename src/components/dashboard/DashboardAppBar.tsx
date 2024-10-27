'use client';
import { AppBar, Box, Toolbar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import UserAvatar from "./UserAvatar";

export default function DashboardAppBar() {
    return (
        <AppBar
            position="fixed"
            color="default"
            sx={{
                boxShadow: 'none',
                zIndex: (theme) => theme.zIndex.drawer + 1
            }}
        >
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link href="/">
                        <Image src="/nexio_trans_bg.png" alt="Nexio" width={125} height={50} />
                    </Link>
                </Box>
                <UserAvatar />
            </Toolbar>
        </AppBar>
    );
}