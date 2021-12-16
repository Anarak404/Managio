import React, { createContext, useCallback, useEffect, useState } from "react";
import { checkLoginApi, logoutApi } from "./api/auth";
import { getTeamsApi } from "./api/team";
import { ITeam, IUser } from "./api/types";

interface IAppContext {
  signIn(data: IUser): void;
  loggedIn: boolean;
  me: IUser | undefined;
  teams: ITeam[];
  getTeams(): void;
  updateProfile(data: IUser): void;
  logout(): void;
}

interface IAppContextProps {
  children?: React.ReactNode;
}

const defaultValue: IAppContext = {
  signIn: (data: IUser) => void 0,
  loggedIn: false,
  me: undefined,
  teams: [],
  getTeams: () => void 0,
  updateProfile: () => void 0,
  logout: () => void 0,
};

export const appContext = createContext<IAppContext>(defaultValue);

const { Provider } = appContext;

export function AppContextProvider({ children }: IAppContextProps) {
  const [me, setMe] = useState<IUser>();
  const [teams, setTeams] = useState<ITeam[]>([]);

  const signIn = useCallback(
    (data: IUser) => {
      setMe(data);
    },
    [setMe]
  );

  const logout = useCallback(() => {
    logoutApi().then(() => setMe(undefined));
  }, [setMe]);

  const updateProfile = useCallback(
    (data: IUser) => {
      setMe(data);
    },
    [setMe]
  );

  const getTeams = useCallback(() => {
    getTeamsApi()
      .then((x) => setTeams(x))
      .catch((e) => {});
  }, [setTeams]);

  useEffect(() => {
    const asyncFunc = async () => {
      try {
        const response = await checkLoginApi();
        setMe(response);
        getTeams();
      } catch {}
    };
    asyncFunc();
  }, [setMe, getTeams]);

  return (
    <Provider
      value={{
        signIn,
        loggedIn: me !== undefined,
        me,
        teams,
        getTeams,
        updateProfile,
        logout,
      }}
    >
      {children}
    </Provider>
  );
}
