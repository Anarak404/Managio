import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, IconButton, Paper } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router-dom";
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
      <Link
        to={`team/${team.id}`}
        style={{
          display: "flex",
          flex: 1,
          padding: "20px",
          minWidth: "50px",
          cursor: "pointer",
          textDecoration: "none",
          color: "black",
        }}
      >
        <Avatar
          sx={{ width: "110px", height: "110px" }}
          src={team.photo}
        />
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
      </Link>
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
