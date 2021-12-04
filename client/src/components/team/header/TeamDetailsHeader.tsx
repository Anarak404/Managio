import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, IconButton, Modal, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { ITeam } from "../../../api/types";
import { TeamCreator } from "../TeamCreator";

interface iProps {
  team: ITeam;
  isOwner: boolean;
}

export function TeamDetailsHeader({ team, isOwner }: iProps) {
  const [editTeam, setEditTeam] = useState<boolean>(false);

  const toggleVisibility = useCallback(() => {
    setEditTeam((s) => !s);
  }, [setEditTeam]);

  return (
    <Box sx={{ display: "flex" }}>
      <Avatar sx={{ width: "200px", height: "200px" }} src={team.photo} />
      <Box
        sx={{
          flex: 1,
          fontSize: "40px",
          alignSelf: "center",
          px: "20px",
          fontWeight: "bold",
        }}
      >
        {team.name}
      </Box>
      {isOwner ? (
        <Box sx={{ display: "flex", gap: "30px", marginBottom: "auto" }}>
          <IconButton onClick={toggleVisibility}>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : (
        <Box
          sx={{
            fontSize: "20px",
            fontStyle: "italic",
            textAlign: "right",
            px: "10px",
          }}
        >
          <Box>Owner</Box>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Avatar src={team.owner.photo} />
            <Typography sx={{ alignSelf: "center" }}>
              {team.owner.name}
            </Typography>
          </Box>
          <Typography>{team.owner.email}</Typography>
        </Box>
      )}
      <Modal
        open={editTeam}
        onClose={toggleVisibility}
        sx={{ display: "flex" }}
      >
        <TeamCreator closeModal={toggleVisibility} team={team} />
      </Modal>
    </Box>
  );
}
