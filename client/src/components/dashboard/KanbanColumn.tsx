import { Box } from "@mui/material";
import React, { useRef } from "react";
import { useDrop } from "react-dnd";
import { ITask } from "../../api/types";
import { Status } from "./DashboardView";

interface IProps {
  status: Status;
  changeTaskStatus(task: ITask, status: Status): void;
  children: React.ReactNode;
}

export const KanbanColumn = ({
  status,
  changeTaskStatus,
  children,
}: IProps) => {
  const ref = useRef(null);
  const [, drop] = useDrop<ITask, any, any>({
    accept: [
      ...["DONE", "IN_PROGRESS", "TO_DO"].filter((s) => status !== s),
    ] as Status[],
    drop(item) {
      changeTaskStatus(item, status);
    },
  });
  drop(ref);
  return (
    <Box sx={{ flex: 1 }} ref={ref}>
      {children}
    </Box>
  );
};
