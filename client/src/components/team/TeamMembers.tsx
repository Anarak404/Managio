import { Box, Button, Typography } from "@mui/material";
import { IUser } from "../../api/types";
import { TeamMemberItem } from "./TeamMemberItem";

interface IProps {
  members: IUser[];
  isOwner: boolean;
}

export function TeamMembers({ members, isOwner }: IProps) {
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
        {isOwner && <Button variant="contained">Add Member</Button>}
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
      </Box>
    </Box>
  );
}
