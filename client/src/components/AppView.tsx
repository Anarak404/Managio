import React, { useContext } from "react";
import { appContext } from "../AppContext";
import AuthView from "./auth/AuthView";
import { MainView } from "./MainView";

export function AppView() {
  const { loggedIn } = useContext(appContext);

  return loggedIn ? <MainView /> : <AuthView />;
}
