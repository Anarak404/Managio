import DeleteIcon from "@mui/icons-material/Delete";
import { Avatar, Box, IconButton } from "@mui/material";
import { useCallback, useContext } from "react";
import { deleteMemberApi } from "../../api/team";
import { IUser } from "../../api/types";
import { appContext } from "../../AppContext";
import { teamContext } from "../../contexts/TeamContext";

interface IProps {
  member: IUser;
  canModify: boolean;
}

export function TeamMemberItem({ member, canModify }: IProps) {
  const { team } = useContext(teamContext);
  const { me, getTeams } = useContext(appContext);

  const handleDelete = useCallback(() => {
    let teamId = 0;
    if (!team) {
      return;
    }
    teamId = team.id;

    deleteMemberApi(teamId, member.id)
      .then(() => getTeams())
      .catch(() => {});
  }, [team, member, getTeams]);

  return (
    <Box
      sx={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          bgcolor: "background.default",
          borderRadius: "10px",
        },
      }}
    >
      <Avatar
        sx={{
          height: "45px",
          width: "45px",
          margin: "10px",
        }}
        src={member.photo}
      />
      <Box sx={{ fontSize: "22px" }}>{member.name}</Box>
      <div style={{ flex: 1 }} />
      {canModify && member.email !== me?.email && (
        <Box sx={{ marginRight: "20px" }}>
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
