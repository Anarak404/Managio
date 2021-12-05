import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { ITask } from "../../../api/types";

interface IProps {
  task: ITask;
}

export function TaskItem({ task }: IProps) {
  return (
    <Box
      sx={{
        display: "flex",
        bgcolor: "red",
        minHeight: "80px",
        borderRadius: "8px",
        m: "10px 5px",
      }}
    >
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" sx={{ mt: "10px", ml: "15px" }}>
          {task.title}
        </Typography>
        <Box sx={{ p: "10px", marginTop: "auto", display: "flex", gap: "4px" }}>
          {task.labels.map((l) => (
            <Box
              sx={{
                bgcolor: "antiquewhite",
                borderRadius: "5px",
                px: "3px",
                whiteSpace: "nowrap",
              }}
            >
              {l.label}
            </Box>
          ))}
        </Box>
      </Box>
      <Box sx={{ alignSelf: "center", px: "10px" }}>
        <Typography>{task.priority}</Typography>
        <Avatar src={task.assignedUser.photo} sx={{ ml: "auto" }} />
      </Box>
    </Box>
  );
}
