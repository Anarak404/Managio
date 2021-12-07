import React, { createContext, useEffect, useState } from "react";
import { getTaskApi } from "../api/task";
import { ITaskDetails } from "../api/types";

interface ITaskContext {
  task?: ITaskDetails;
}

interface ITaskContextProps {
  children?: React.ReactNode;
  id: number;
}

const defaultValue: ITaskContext = {
  task: undefined,
};

export const taskContext = createContext<ITaskContext>(defaultValue);

const { Provider } = taskContext;

export function TaskContextProvider({ id, children }: ITaskContextProps) {
  const [task, setTask] = useState<ITaskDetails>();

  useEffect(() => {
    getTaskApi(id).then((response) => setTask(response));
  }, [setTask, id]);

  return <Provider value={{ task }}>{children}</Provider>;
}
