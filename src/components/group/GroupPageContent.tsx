import { Box, Typography } from "@mui/material";

export default function GroupPageContent() {
    return (
        <Box sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', padding: 2 }}>
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 'bold',
                    marginLeft: 1,
                    marginBottom: 1
                }}
            >
                Groups
            </Typography>
        </Box>
    );
}