import { Box, Paper } from "@mui/material";

export default function ChatPageLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Box
                sx={{
                    px: '2px',
                    py: '1%',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Paper
                    variant="outlined"
                    sx={{
                        mx: '1%',
                        my: '1%',
                        height: '100%',
                        width: '30%',
                        borderRadius: '10px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    {children}
                </Paper>
                <Paper
                    variant="outlined"
                    sx={{
                        mr: '1%',
                        my: '1%',
                        height: '100%',
                        width: '70%',
                        borderRadius: '10px',
                    }}
                >
                    <h1>Chat Session</h1>
                </Paper>
            </Box>
        </>
    );
}