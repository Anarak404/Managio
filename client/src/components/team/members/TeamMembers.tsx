import { Box, Button, Modal, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { IUser } from "../../../api/types";
import { Invitation } from "./Invitation";
import { TeamMemberItem } from "./TeamMemberItem";

interface IProps {
  members: IUser[];
  isOwner: boolean;
}

export function TeamMembers({ members, isOwner }: IProps) {
  const [open, setOpen] = useState<boolean>(false);

  const toggleVisibility = useCallback(() => {
    setOpen((s) => !s);
  }, [setOpen]);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          py: "10px",
        }}
      >
        <Typography sx={{ fontSize: "20px" }}>Members</Typography>
        {isOwner && (
          <Button variant="contained" onClick={toggleVisibility}>
            Add Members
          </Button>
        )}
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => `${theme.lightBackgroundColor}`,
          borderRadius: "10px",
        }}
      >
        {members.map((e) => (
          <TeamMemberItem key={e.email} member={e} canModify={isOwner} />
        ))}
        <Modal open={open} onClose={toggleVisibility} sx={{ display: "flex" }}>
          <Invitation closeModel={toggleVisibility} />
        </Modal>
      </Box>
    </Box>
  );
}
