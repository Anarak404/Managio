import React, { createContext, useContext, useEffect, useState } from "react";
import { getTeamApi } from "../api/team";
import { ITeamDetails } from "../api/types";
import { appContext } from "../AppContext";

interface ITeamContext {
  team?: ITeamDetails;
}

interface ITeamContextProps {
  children?: React.ReactNode;
  id: number;
}

const defaultValue: ITeamContext = {
  team: undefined,
};

export const teamContext = createContext<ITeamContext>(defaultValue);

const { Provider } = teamContext;

export function TeamContextProvider({ children, id }: ITeamContextProps) {
  const [team, setTeam] = useState<ITeamDetails>();

  const { teams } = useContext(appContext);

  useEffect(() => {
    getTeamApi(id)
      .then((e) => setTeam(e))
      .catch(() => {});
  }, [setTeam, id, teams]);

  return <Provider value={{ team }}>{children}</Provider>;
}
