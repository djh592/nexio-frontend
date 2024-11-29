
import React from "react";
import { Box, ListItem, ListItemAvatar, Skeleton } from "@mui/material";

export default function ChatItemSkeleton() {
    return (
        <ListItem
            sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: "#f5f5f5" },
                display: "flex",
                alignItems: "center",
            }}
        >
            <ListItemAvatar>
                {/* Avatar skeleton */}
                <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>

            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    {/* Chat name skeleton */}
                    <Skeleton variant="text" width="60%" height={20} />
                    {/* Timestamp skeleton */}
                    <Skeleton variant="text" width="30%" height={16} />
                </Box>

                {/* Last message skeleton */}
                <Skeleton variant="text" width="80%" height={18} />
            </Box>

            <Skeleton variant="rectangular" width={24} height={24} sx={{ marginLeft: 2 }} />
        </ListItem>
    );
}
