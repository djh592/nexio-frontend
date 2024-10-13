import { AppBar, Box, Button, Toolbar } from "@mui/material";
import Link from "next/link";
import Image from "next/image";

export default function AuthAppBar() {
    return (
        <AppBar position="static" color="default" sx={{ boxShadow: 'none' }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1 }}>
                    <Link href="/">
                        <Image src="/nexio_trans_bg.png" alt="Nexio" width={125} height={50} />
                    </Link>
                </Box>
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
            </Toolbar>
        </AppBar>
    );
}