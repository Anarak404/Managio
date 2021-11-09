import { ThemeProvider } from "@mui/material/styles";
import React from "react";
import AuthView from "./components/auth/AuthView";
import { lightTheme } from "./contexts/settings/theme";

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <div className="App">
        <AuthView />
      </div>
    </ThemeProvider>
  );
}

export default App;
