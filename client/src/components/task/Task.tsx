import { Box, Button, CircularProgress, Divider } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { editTaskApi, getConfigApi } from "../../api/task";
import { getMembersApi } from "../../api/team";
import { ILabel, ITaskDetails, IUser } from "../../api/types";
import { appContext } from "../../AppContext";
import { taskContext } from "../../contexts/TaskContext";
import { TaskDetails } from "./TaskDetails";
import { TaskMainContent } from "./TaskMainContent";

interface IProps {
  task: ITaskDetails;
}

export type EditableTask = Pick<
  ITaskDetails,
  "title" | "description" | "assignedUser" | "labels" | "priority"
>;

function mapTask({
  title,
  description,
  assignedUser,
  labels,
  priority,
}: ITaskDetails): EditableTask {
  return { title, description, assignedUser, labels, priority };
}

export function Task({ task }: IProps) {
  const { me } = useContext(appContext);
  const { setTask } = useContext(taskContext);
  const [inEditMode, setInEditMode] = useState(false);
  const [tempTask, setTempTask] = useState(mapTask(task));
  const [members, setMembers] = useState<IUser[]>([]);
  const [config, setConfig] = useState({
    labels: [] as ILabel[],
    priorities: [] as string[],
  });

  const toggleEditMode = useCallback(() => {
    setInEditMode((s) => !s);
  }, [setInEditMode]);

  const handleCancel = useCallback(() => {
    setTempTask(mapTask(task));
    toggleEditMode();
  }, [task, setTempTask, toggleEditMode]);

  const handleSave = () => {
    editTaskApi(task.id, {
      ...tempTask,
      teamId: task.assignedTeam.id,
      userId: tempTask.assignedUser.id,
    }).then((response) => {
      setTask(response);
      setTempTask(mapTask(response));
      toggleEditMode();
    });
  };

  useEffect(() => {
    getConfigApi().then((response) => {
      setConfig(response);
    });

    getMembersApi(task.assignedTeam.id).then((response) =>
      setMembers(response)
    );
  }, [setConfig, setMembers, task]);

  return (
    <Box
      sx={{
        display: "flex",
        px: "40px",
        height: "auto",
        minHeight: "100%",
        flexDirection: "column",
      }}
    >
      {task ? (
        <React.Fragment>
          {task.reporter.id === me?.id && (
            <Box
              sx={{ display: "flex", flexDirection: "row-reverse", gap: "5px" }}
            >
              <Button
                variant="contained"
                sx={{ p: "10px 30px" }}
                color="primary"
                onClick={inEditMode ? handleSave : toggleEditMode}
              >
                {inEditMode ? "Save" : "Edit"}
              </Button>
              {inEditMode && (
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{
                    bgcolor: (theme) => `${theme.secondaryBackgroundColor}`,
                  }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          )}
          <Box sx={{ display: "flex" }}>
            <TaskMainContent
              task={task}
              inEditMode={inEditMode}
              mappedTask={tempTask}
              setTempTask={setTempTask}
            />
            <Divider flexItem orientation="vertical" />
            <TaskDetails
              task={task}
              inEditMode={inEditMode}
              mappedTask={tempTask}
              setTempTask={setTempTask}
              members={members}
              labels={config.labels}
              priorities={config.priorities}
            />
          </Box>
        </React.Fragment>
      ) : (
        <CircularProgress sx={{ margin: "auto" }} />
      )}
    </Box>
  );
}
