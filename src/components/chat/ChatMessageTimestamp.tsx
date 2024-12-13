import React from "react";
import { Box, Typography } from "@mui/material";

interface ChatMessageTimestampProps {
  timestamp: string;
}

export default function ChatMessageTimestamp({ timestamp }: ChatMessageTimestampProps) {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginY: 2,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: "gray",
          fontSize: "0.875rem",
          backgroundColor: "#f0f0f0",
          paddingX: 2,
          paddingY: 0.5,
          borderRadius: 2,
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        {timestamp}
      </Typography>
    </Box>
  );
};


