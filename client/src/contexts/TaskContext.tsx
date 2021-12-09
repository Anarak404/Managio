import React, { createContext, useCallback, useEffect, useState } from "react";
import { changeTaskStatusApi, getTaskApi } from "../api/task";
import { IName, ITaskDetails } from "../api/types";

interface ITaskContext {
  task?: ITaskDetails;
  changeStatus(data: IName): void;
}

interface ITaskContextProps {
  children?: React.ReactNode;
  id: number;
}

const defaultValue: ITaskContext = {
  task: undefined,
  changeStatus: () => void 0,
};

export const taskContext = createContext<ITaskContext>(defaultValue);

const { Provider } = taskContext;

export function TaskContextProvider({ id, children }: ITaskContextProps) {
  const [task, setTask] = useState<ITaskDetails>();

  const changeStatus = useCallback(
    (data: IName) => {
      if (!task) {
        return;
      }
      changeTaskStatusApi(data, task.id).then(() =>
        setTask((task) => {
          if (task) {
            return { ...task, status: data.name };
          }
        })
      );
    },
    [setTask, task]
  );

  useEffect(() => {
    getTaskApi(id).then((response) => setTask(response));
  }, [setTask, id]);

  return <Provider value={{ task, changeStatus }}>{children}</Provider>;
}
