import React, { useContext } from "react";
import { appContext } from "../AppContext";
import AuthView from "./auth/AuthView";
import { Menu } from "./Menu";

export function AppView() {
  const { loggedIn } = useContext(appContext);

  return loggedIn ? <Menu /> : <AuthView />;
}
