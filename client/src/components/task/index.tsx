import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskContextProvider } from "../../contexts/TaskContext";
import { Task } from "./Task";

type Params = "id";

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
      <Task />
    </TaskContextProvider>
  );
}
