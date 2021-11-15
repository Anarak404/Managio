import React, { createContext, useCallback, useState } from "react";
import { ISignInRequest, IUser } from "./api/types";

interface IAppContext {
  signIn(data: IUser, credentials: ISignInRequest): void;
  loggedIn: boolean;
}

interface IAppContextProps {
  children?: React.ReactNode;
}

const defaultValue: IAppContext = {
  signIn: (data: IUser, credentials: ISignInRequest) => void 0,
  loggedIn: false,
};

export const appContext = createContext<IAppContext>(defaultValue);

const { Provider } = appContext;

export function AppContextProvider({ children }: IAppContextProps) {
  const [me, setMe] = useState<IUser>();

  const signIn = useCallback(
    (data: IUser, credentials: ISignInRequest) => {
      setMe(data);
    },
    [setMe]
  );

  return (
    <Provider value={{ signIn, loggedIn: me !== undefined }}>
      {children}
    </Provider>
  );
}
