import { Box, Button, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { getAllTasksApi } from "../../api/task";
import { IParams, ITask } from "../../api/types";
import { TaskTable } from "./table/TaskTable";

export function TasksView() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [pageable, setPageable] = useState<IParams>({
    page: 0,
    size: 10,
  });
  const [totalItems, setTotalItems] = useState<number>(0);
  const tasksLength = tasks.length;

  const handleDecision = useCallback(
    (data: IParams) => {
      setPageable({ ...data });
    },
    [setPageable]
  );

  useEffect(() => {
    if (tasksLength >= (pageable.page + 1) * pageable.size) {
      return;
    }
    getAllTasksApi(pageable).then((t) => {
      setTasks((tasks) => {
        const tasksId = tasks.map((task) => task.id);
        const newTasks = t.tasks.filter((task) => !tasksId.includes(task.id));
        return [...tasks, ...newTasks];
      });
      setTotalItems(t.totalItems);
    });
  }, [setTasks, pageable, setTotalItems, tasksLength]);

  return (
    <Box>
      <Typography
        sx={{ fontSize: "50px", fontWeight: "bold", p: " 20px 50px" }}
      >
        Issues
      </Typography>
      <Box sx={{ display: "flex", gap: "30px" }}>
        <TextField multiline rows="2" sx={{ width: "80%" }} />
        <Button
          color="primary"
          variant="contained"
          sx={{ width: "150px", height: "50px" }}
        >
          Search
        </Button>
      </Box>

      <Box sx={{ mt: "20px" }}>
        <TaskTable
          tasks={tasks}
          handleDecision={handleDecision}
          totalItems={totalItems}
        />
      </Box>
    </Box>
  );
}
