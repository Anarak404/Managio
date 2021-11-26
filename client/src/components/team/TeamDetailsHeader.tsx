import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Typography } from "@mui/material";
import { ITeam } from "../../api/types";

interface iProps {
  team: ITeam;
  isOwner: boolean;
}

export function TeamDetailsHeader({ team, isOwner }: iProps) {
  return (
    <Box sx={{ display: "flex" }}>
      <Box sx={{ width: "200px", height: "200px", bgcolor: "yellow" }}>
        {team.photo}
      </Box>
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
          <IconButton>
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
            <Box sx={{ width: "60px", height: "60px", bgcolor: "red" }}>
              {team.owner.photo}
            </Box>
            <Typography sx={{ alignSelf: "center" }}>
              {team.owner.name}
            </Typography>
          </Box>
          <Typography>{team.owner.email}</Typography>
        </Box>
      )}
    </Box>
  );
}
