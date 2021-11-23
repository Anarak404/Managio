import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, IconButton, Paper } from "@mui/material";
import { useContext } from "react";
import { ITeam } from "../../api/types";
import { appContext } from "../../AppContext";

interface IProps {
  team: ITeam;
}

export function TeamItem({ team }: IProps) {
  const { me } = useContext(appContext);

  return (
    <Paper
      sx={{
        display: "flex",
        minHeight: "150px",
        minWidth: "1200px",
        flexDirection: "row",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: 1,
          p: "20px",
          minWidth: "50px",
          cursor: "pointer",
        }}
      >
        <Box sx={{ width: "110px" }}>{team.photo}</Box>
        <Box
          sx={{
            alignSelf: "center",
            pl: "20px",
            fontWeight: "bold",
            fontSize: "35px",
          }}
        >
          {team.name}
        </Box>
      </Box>
      {team.owner === me && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            p: "20px",
          }}
        >
          <IconButton>
            <EditIcon />
          </IconButton>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Paper>
  );
}
