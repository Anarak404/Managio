import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { taskContext, TaskContextProvider } from "../../contexts/TaskContext";
import { Task } from "./Task";

type Params = "id";

function Wrapper() {
  const { task } = useContext(taskContext);

  return task ? <Task task={task} /> : null;
}

export function TaskRoute() {
  const { id } = useParams<Params>();

  const navigate = useNavigate();

  const idIsNotANumber = !id || isNaN(+id);

  useEffect(() => {
    if (idIsNotANumber) {
      navigate("/dashboard", { replace: true });
    }
  }, [idIsNotANumber, navigate]);

  if (idIsNotANumber) {
    return null;
  }

  return (
    <TaskContextProvider id={+id}>
      <Wrapper />
    </TaskContextProvider>
  );
}
