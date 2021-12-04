import ClearIcon from "@mui/icons-material/Clear";
import { Box, IconButton, Typography } from "@mui/material";
import React from "react";

interface IProps {
  email: string;
  delete(): void;
}

export function InvitationItem({ email, delete: deleteCallback }: IProps) {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Typography>{email}</Typography>
      <IconButton onClick={deleteCallback}>
        <ClearIcon />
      </IconButton>
    </Box>
  );
}
