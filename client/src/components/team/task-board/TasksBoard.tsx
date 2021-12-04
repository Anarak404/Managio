import { Box, Typography } from "@mui/material";
import React from "react";
import { ITask } from "../../../api/types";
import { TaskItem } from "./TaskItem";

interface IProps {
  todoTasks: ITask[];
  inProgressTasks: ITask[];
  doneTasks: ITask[];
}

export function TasksBoard({ doneTasks, inProgressTasks, todoTasks }: IProps) {
  return (
    <Box
      sx={{
        display: "flex",
        height: "500px",
      }}
    >
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" sx={{ ml: "15px" }}>
          TO DO
        </Typography>
        <Box sx={{ overflow: "auto" }}>
          {todoTasks.map((i, index) => (
            <TaskItem task={i} />
          ))}
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" sx={{ ml: "15px" }}>
          IN PROGRESS
        </Typography>
        <Box sx={{ overflow: "auto" }}>
          {inProgressTasks.map((i, index) => (
            <TaskItem task={i} />
          ))}
        </Box>
      </Box>
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" sx={{ ml: "15px" }}>
          DONE
        </Typography>
        <Box sx={{ overflow: "auto" }}>
          {doneTasks.map((i, index) => (
            <TaskItem task={i} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}
