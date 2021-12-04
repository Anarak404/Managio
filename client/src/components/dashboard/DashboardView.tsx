import { Box, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { changeTaskStatusApi, getTasksAssignedToUserApi } from "../../api/task";
import { IName, ITask, ITaskPackage } from "../../api/types";
import { TaskItem } from "../team/task-board/TaskItem";
import { KanbanColumn } from "./KanbanColumn";
import { KanbanItem } from "./KanbanItem";

export type Status = "TO_DO" | "IN_PROGRESS" | "DONE";

type StatusMap = Record<Status, keyof ITaskPackage>;

const statusMap: StatusMap = {
  TO_DO: "todoTasks",
  IN_PROGRESS: "inProgressTasks",
  DONE: "doneTasks",
};

export function DashboardView() {
  const [tasks, setTasks] = useState<ITaskPackage>({
    doneTasks: [],
    inProgressTasks: [],
    todoTasks: [],
  });

  const changeTaskStatus = useCallback(
    (task: ITask, status: Status) => {
      const asyncFunction = async () => {
        const arrayToTrim = statusMap[task.status];
        const oldArray = tasks[arrayToTrim];
        const taskIndex = oldArray.findIndex((t) => t.id === task.id);
        if (taskIndex === -1) {
          return;
        }

        const data: IName = { name: status };

        const response = await changeTaskStatusApi(data, task.id);
        if (!response.success) {
          return;
        }

        oldArray.splice(taskIndex, 1);

        const arrayToPush = statusMap[status];
        const newArray = tasks[arrayToPush];
        setTasks((tasks) => ({
          ...tasks,
          [arrayToTrim]: [...oldArray],
          [arrayToPush]: [...newArray, { ...task, status }],
        }));
      };
      asyncFunction();
    },
    [tasks]
  );

  useEffect(() => {
    getTasksAssignedToUserApi().then((response) => setTasks(response));
  }, [setTasks]);

  return (
    <Box
      sx={{ display: "flex", p: "40px", gap: "60px", flexDirection: "column" }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        Tasks assigned to you
      </Typography>
      <DndProvider backend={HTML5Backend}>
        <Box
          sx={{
            width: "90%",
            height: "700px",
            alignSelf: "center",
            display: "flex",
            bgcolor: "green",
            borderRadius: "10px",
            p: "10px",
          }}
        >
          {Object.entries(statusMap).map(([key, value]) => {
            const status = key as Status;
            return (
              <KanbanColumn
                key={status}
                status={status}
                changeTaskStatus={changeTaskStatus}
              >
                <Box>
                  <Typography variant="h6" sx={{ ml: "15px" }}>
                    {status}
                  </Typography>
                  <Box sx={{ overflow: "auto", height: "650px" }}>
                    {tasks[value].map((item) => (
                      <KanbanItem key={item.id} task={item}>
                        <TaskItem task={item} />
                      </KanbanItem>
                    ))}
                  </Box>
                </Box>
              </KanbanColumn>
            );
          })}
        </Box>
      </DndProvider>
    </Box>
  );
}
