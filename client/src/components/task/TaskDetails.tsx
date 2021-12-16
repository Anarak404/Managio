import {
  Autocomplete,
  Avatar,
  Box,
  Button,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext } from "react";
import { ILabel, IName, ITaskDetails, IUser } from "../../api/types";
import { appContext } from "../../AppContext";
import { taskContext } from "../../contexts/TaskContext";
import { Status } from "../dashboard/DashboardView";
import { LabelSelector } from "./create-task/LabelSelector";
import { EditableTask } from "./Task";

interface IProps {
  task: ITaskDetails;
  mappedTask: EditableTask;
  inEditMode: boolean;
  setTempTask: React.Dispatch<React.SetStateAction<EditableTask>>;
  members: IUser[];
  labels: ILabel[];
  priorities: string[];
}

const options: string[] = ["TO_DO", "IN_PROGRESS", "DONE"];

export function TaskDetails({
  task,
  inEditMode,
  mappedTask,
  setTempTask,
  members,
  labels,
  priorities,
}: IProps) {
  const { me } = useContext(appContext);
  const { changeStatus } = useContext(taskContext);

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const data: IName = { name: event.target.value as Status };
      changeStatus(data);
    },
    [changeStatus]
  );

  const assigneeUser = useCallback(
    (e: React.SyntheticEvent, value: IUser | null) => {
      if (value === null) {
        return;
      }
      setTempTask((task) => ({ ...task, assignedUser: value }));
    },
    [setTempTask]
  );

  const handlePriority = useCallback(
    (e: React.SyntheticEvent, value: string | null) => {
      if (value === null) {
        return;
      }
      setTempTask((task) => ({ ...task, priority: value }));
    },
    [setTempTask]
  );

  const handleLabels = useCallback(
    (labels: ILabel[]) => {
      setTempTask((task) => ({ ...task, labels: labels }));
    },
    [setTempTask]
  );

  return (
    <Box
      sx={{
        minWidth: "500px",
        pl: "10px",
        fontSize: "19px",
      }}
    >
      <div style={{ height: "80px" }} />
      <Box
        sx={{
          px: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "180px",
          }}
        >
          {task.assignedUser.id === me?.id ? (
            <FormControl fullWidth>
              <Select
                value={task.status}
                onChange={handleChange}
                displayEmpty
                sx={{ bgcolor: "primary.main", color: "#fff" }}
              >
                {options.map((o) => (
                  <MenuItem value={o} key={o}>
                    {o}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          ) : (
            <Button variant="contained">{task.status}</Button>
          )}
        </Box>
        <Divider />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ width: "130px" }}>
            Assigned user:
          </Typography>
          {inEditMode ? (
            <Autocomplete
              value={mappedTask.assignedUser}
              onChange={assigneeUser}
              options={members}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: "200px",
                    bgcolor: (theme) => `${theme.secondaryBackgroundColor}`,
                  }}
                />
              )}
            />
          ) : (
            <React.Fragment>
              <Avatar src={task.assignedUser.photo} sx={{ m: "10px" }} />
              <Box>{task.assignedUser.name}</Box>
            </React.Fragment>
          )}
        </Box>
        <Divider />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ width: "130px" }}>
            Reporter:
          </Typography>
          <Avatar src={task.reporter.photo} sx={{ m: "10px" }} />
          <Box>{task.reporter.name}</Box>
        </Box>
        <Divider />
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle1" sx={{ pr: "20px", width: "130px" }}>
            Priority:
          </Typography>
          {inEditMode ? (
            <Autocomplete
              value={mappedTask.priority}
              options={priorities}
              onChange={handlePriority}
              renderInput={(params) => (
                <TextField
                  {...params}
                  sx={{
                    width: "200px",
                    bgcolor: (theme) => `${theme.secondaryBackgroundColor}`,
                  }}
                />
              )}
            />
          ) : (
            task.priority
          )}
        </Box>
        <Divider />
        <Box sx={{ display: "flex" }}>
          <Typography variant="subtitle1" sx={{ pr: "20px", width: "130px" }}>
            Labels:
          </Typography>
          <Box sx={{ display: "flex", gap: "4px" }}>
            {inEditMode ? (
              <LabelSelector
                labels={labels}
                handleLabels={handleLabels}
                selectedLabels={mappedTask.labels}
              />
            ) : (
              task.labels.map((l) => (
                <Box
                  key={l.label}
                  sx={{
                    bgcolor: (theme) => `${theme.labelBackGroundColor}`,
                    borderRadius: "5px",
                    px: "3px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {l.label}
                </Box>
              ))
            )}
          </Box>
        </Box>
        <Divider />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1" sx={{ width: "130px" }}>
            Assigned team:
          </Typography>
          <Avatar src={task.assignedTeam.photo} sx={{ m: "10px" }} />
          <Box>{task.assignedTeam.name}</Box>
        </Box>
      </Box>
    </Box>
  );
}
