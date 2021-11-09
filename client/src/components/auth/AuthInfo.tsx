import { Box, Button, Container, Divider } from "@mui/material";
import React from "react";

interface IProps {
  redirectWindow?: () => void;
  loginOpen: boolean;
}

export function AuthInfo({ redirectWindow, loginOpen }: IProps) {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backdropFilter: "blur(8px)",
        bgcolor: (theme) => `${theme.darkerBackgroundColor}`,
        width: "80%",
        height: " 80%",
        borderRadius: "5px",
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          fontSize: "28px",
          marginLeft: "30px",
          p: "5px 10px",
          bgcolor: (theme) => `${theme.lightGrey}`,
          m: "30px",
        }}
      >
        MANAGIO
      </Box>
      <Divider
        sx={{
          width: "20%",
          ml: "30px",
          border: (theme) => `1px solid ${theme.secondaryBackgroundColor}`,
        }}
      />
      <Box sx={{ fontSize: "22px", m: "30px" }}>
        Easily collaborate with your team.
      </Box>
      <Box sx={{ flex: 1 }} />
      <Box sx={{ fontSize: "18px", m: "10px 30px" }}>
        {loginOpen ? "Don't have an account yet?" : "Already have an account?"}
      </Box>
      <Button
        variant="contained"
        color="secondary"
        sx={{
          width: "85%",
          alignSelf: "center",
          borderRadius: "5px",
          m: "10px 30px 20px 30px",
          py: "10px",
        }}
        onClick={redirectWindow}
      >
        {loginOpen ? "Sign up" : "Sign in"}
      </Button>
    </Container>
  );
}
