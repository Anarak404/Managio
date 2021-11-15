import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import { AppContextProvider } from "./AppContext";
import { AppView } from "./components/AppView";
import { lightTheme } from "./contexts/settings/theme";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <AppContextProvider>
        <AppView />
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
