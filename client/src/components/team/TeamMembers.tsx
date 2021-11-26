import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { IUser } from "../../api/types";
import { appContext } from "../../AppContext";
import { TeamMemberItem } from "./TeamMemberItem";

interface IProps {
  members: IUser[];
  owner: IUser;
}

export function TeamMembers({ members, owner }: IProps) {
  const { me } = useContext(appContext);

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
        {true && <Button variant="contained">Add Member</Button>}
      </Box>
      <Box
        sx={{
          bgcolor: (theme) => `${theme.lightBackgroundColor}`,
          borderRadius: "10px",
        }}
      >
        {members.map((e) => (
          <TeamMemberItem key={e.email} member={e} canModify={owner === me} />
        ))}
      </Box>
    </Box>
  );
}
