import { Box, CircularProgress } from "@mui/material";
import React, { useContext } from "react";
import { appContext } from "../../AppContext";
import { teamContext } from "../../contexts/TeamContext";
import { TasksBoard } from "./task-board/TasksBoard";
import { TeamDetailsHeader } from "./TeamDetailsHeader";
import { TeamMembers } from "./TeamMembers";

export function TeamDetailsView() {
  const { me } = useContext(appContext);
  const { team } = useContext(teamContext);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        px: "80px",
        height: team ? "auto" : "100%",
      }}
    >
      {team ? (
        <React.Fragment>
          <TeamDetailsHeader
            team={team}
            isOwner={team.owner.email === me?.email}
          />
          <TasksBoard
            todoTasks={team.todoTasks}
            inProgressTasks={team.inProgressTasks}
            doneTasks={team.doneTasks}
          />
          <TeamMembers
            members={team.teamMembers}
            isOwner={team.owner.email === me?.email}
          />
        </React.Fragment>
      ) : (
        <CircularProgress sx={{ margin: "auto" }} />
      )}
    </Box>
  );
}
