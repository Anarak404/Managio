import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TeamContextProvider } from "../../contexts/TeamContext";
import { TeamDetailsView } from "./TeamDetailsView";

type Params = "id";

export function TeamRoute() {
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
    <TeamContextProvider id={+id}>
      <TeamDetailsView />
    </TeamContextProvider>
  );
}
