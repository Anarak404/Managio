import React, { useRef } from "react";
import { useDrag } from "react-dnd";
import { ITask } from "../../api/types";

interface IProps {
  task: ITask;
  children: React.ReactNode;
}

export const KanbanItem = ({ task, children }: IProps) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag<ITask, any, any>({
    item: task,
    type: task.status,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(ref);
  return (
    <div ref={ref} style={{ opacity }}>
      {children}
    </div>
  );
};
