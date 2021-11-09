import { Box, Container } from "@mui/material";
import React, { useCallback, useState } from "react";
import backgroundImage from "../../assets/authIcon.jpg";
import { AuthInfo } from "./AuthInfo";
import { Login } from "./Login";
import { Register } from "./Register";

export default function AuthView() {
  const [loginOpen, setLoginOpen] = useState(true);

  const toggleLogin = useCallback(() => {
    setLoginOpen((v) => !v);
  }, [setLoginOpen]);

  return (
    <Box
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
      }}
    >
      <Container
        disableGutters
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "70%",
          padding: 0,
          boxSizing: "border-box",
          bgcolor: (theme) => `${theme.secondaryBackgroundColor}`,
          borderRadius: "25px",
          overflow: "hidden",
          boxShadow: (theme) => `0 0 20px 0px ${theme.mediumGrey}`,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            backgroundImage: `url(${backgroundImage})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "20px",
            color: "primary.contrastText",
            transform: `${loginOpen ? "" : "translateX(100%)"}`,
            transition: "transform linear 1s",
            zIndex: 300,
          }}
        >
          <AuthInfo redirectWindow={toggleLogin} loginOpen={loginOpen} />
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            transform: `${loginOpen ? "" : "translateX(-100%)"}`,
          }}
        >
          {loginOpen ? <Login /> : <Register />}
        </Box>
      </Container>
    </Box>
  );
}
