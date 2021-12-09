import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography
} from "@mui/material";
import React, { useCallback, useContext } from "react";
import { IName, ITaskDetails } from "../../api/types";
import { appContext } from "../../AppContext";
import { taskContext } from "../../contexts/TaskContext";
import { Status } from "../dashboard/DashboardView";

const options: string[] = ["TO_DO", "IN_PROGRESS", "DONE"];

interface IProps {
  task: ITaskDetails;
}

export function Task({ task }: IProps) {
  const { me } = useContext(appContext);
  const { changeStatus } = useContext(taskContext);

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      const data: IName = { name: event.target.value as Status };
      changeStatus(data);
    },
    [changeStatus]
  );

  return (
    <Box
      sx={{ display: "flex", px: "40px", height: "auto", minHeight: "100%" }}
    >
      {task ? (
        <React.Fragment>
          <Box
            sx={{
              width: "100%",
              p: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <Typography variant="h3">{task.title}</Typography>
            <Typography variant="subtitle1">Description</Typography>
            <Box
              sx={{
                border: "1px solid #9d977a",
                borderRadius: "5px",
                fontSize: "18px",
                p: "10px",
              }}
            >
              {task.description}
            </Box>
            <Typography variant="subtitle1">Attachments</Typography>
            <Box
              sx={{
                border: "1px solid #9d977a",
                borderRadius: "5px",
                fontSize: "18px",
                p: "10px",
              }}
            >
              Attachments
            </Box>
            <Typography variant="subtitle1">Comments</Typography>
            <Box
              sx={{
                border: "1px solid #9d977a",
                borderRadius: "5px",
                fontSize: "18px",
                p: "10px",
              }}
            >
              Comments
            </Box>
          </Box>
          <Divider flexItem orientation="vertical" />
          <Box
            sx={{
              minWidth: "500px",
              pl: "10px",
              fontSize: "19px",
            }}
          >
            {task.reporter.id === me?.id && (
              <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                <Button
                  variant="contained"
                  sx={{ p: "10px 30px" }}
                  color="primary"
                >
                  Edit
                </Button>
              </Box>
            )}

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
                <Avatar src={task.assignedUser.photo} sx={{ m: "10px" }} />
                <Box>{task.assignedUser.name}</Box>
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
                <Typography
                  variant="subtitle1"
                  sx={{ pr: "20px", width: "130px" }}
                >
                  Priority:
                </Typography>
                {task.priority}
              </Box>
              <Divider />
              <Box sx={{ display: "flex" }}>
                <Typography
                  variant="subtitle1"
                  sx={{ pr: "20px", width: "130px" }}
                >
                  Labels:
                </Typography>
                <Box sx={{ display: "flex", gap: "4px" }}>
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
        </React.Fragment>
      ) : (
        <CircularProgress sx={{ margin: "auto" }} />
      )}
    </Box>
  );
}
