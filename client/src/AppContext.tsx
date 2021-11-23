import React, { createContext, useCallback, useState } from "react";
import { getTeamsApi } from "./api/team";
import { ISignInRequest, ITeam, IUser } from "./api/types";

interface IAppContext {
  signIn(data: IUser, credentials: ISignInRequest): void;
  loggedIn: boolean;
  me: IUser | undefined;
  teams: ITeam[];
  getTeams(): void;
}

interface IAppContextProps {
  children?: React.ReactNode;
}

const defaultValue: IAppContext = {
  signIn: (data: IUser, credentials: ISignInRequest) => void 0,
  loggedIn: false,
  me: undefined,
  teams: [],
  getTeams: () => void 0,
};

export const appContext = createContext<IAppContext>(defaultValue);

const { Provider } = appContext;

export function AppContextProvider({ children }: IAppContextProps) {
  const [me, setMe] = useState<IUser>();
  const [teams, setTeams] = useState<ITeam[]>([]);

  const signIn = useCallback(
    (data: IUser, credentials: ISignInRequest) => {
      setMe(data);
    },
    [setMe]
  );

  const getTeams = useCallback(() => {
    getTeamsApi()
      .then((x) => setTeams(x))
      .catch((e) => {});
  }, [setTeams]);

  return (
    <Provider
      value={{ signIn, loggedIn: me !== undefined, me, teams, getTeams }}
    >
      {children}
    </Provider>
  );
}
