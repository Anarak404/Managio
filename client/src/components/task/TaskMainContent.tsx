import { Box, TextField, Typography } from "@mui/material";
import React, { useCallback } from "react";
import { ITaskDetails } from "../../api/types";
import { CommentsView } from "./comments/CommentsView";
import { EditableTask } from "./Task";
import { TaskAttachmentsView } from "./TaskAttachmentsView";

interface IProps {
  task: ITaskDetails;
  mappedTask: EditableTask;
  inEditMode: boolean;
  setTempTask: React.Dispatch<React.SetStateAction<EditableTask>>;
}

export function TaskMainContent({
  task,
  inEditMode,
  mappedTask,
  setTempTask,
}: IProps) {
  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTempTask((task) => ({ ...task, title: e.target.value }));
    },
    [setTempTask]
  );

  const handleDescriptionChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setTempTask((task) => ({ ...task, description: e.target.value }));
    },
    [setTempTask]
  );

  return (
    <Box
      sx={{
        width: "100%",
        p: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {inEditMode ? (
        <TextField
          multiline
          rows={1}
          value={mappedTask.title}
          onChange={handleTitleChange}
          sx={{ bgcolor: (theme) => `${theme.secondaryBackgroundColor}` }}
        />
      ) : (
        <Typography variant="h3">{task.title}</Typography>
      )}

      <Typography variant="subtitle1">Description</Typography>
      {inEditMode ? (
        <TextField
          multiline
          rows={10}
          value={mappedTask.description}
          onChange={handleDescriptionChange}
          sx={{ bgcolor: (theme) => `${theme.secondaryBackgroundColor}` }}
        />
      ) : (
        <Box
          sx={{
            border: (theme) => `1px solid ${theme.labelBackGroundColor}`,
            borderRadius: "5px",
            fontSize: "18px",
            p: "10px",
            bgcolor: (theme) => `${theme.secondaryBackgroundColor}`,
          }}
        >
          {task.description}
        </Box>
      )}

      <TaskAttachmentsView attachments={task.attachments} />
      <CommentsView id={task.id} />
    </Box>
  );
}
