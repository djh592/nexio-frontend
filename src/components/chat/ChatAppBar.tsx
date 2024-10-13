'use client';
import { AppBar, Box, Toolbar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";
import UserAvatar from "./UserAvatar";

export default function ChatAppBar() {
    return (
        <AppBar position="static" color="default" sx={{ boxShadow: 'none' }}>
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