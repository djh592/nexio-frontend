import { Box, Typography } from "@mui/material";
import GroupDisplayCard from "@/components/group/GroupDisplayCard";
import UserDisplayAvatar from "@/components/user/UserDisplayAvatar";

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
            <GroupDisplayCard chatId="1" />
            <GroupDisplayCard chatId="2" />
            <UserDisplayAvatar userId="1" />
        </Box>
    );
}