import { Box, Button, Container, FormControl, TextField } from "@mui/material";
import React, { useCallback, useRef } from "react";

export function Register() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

  const register = useCallback(() => {
    console.log(emailRef.current?.value);
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "calc(100% - 40px)",
      }}
    >
      <Box sx={{ fontSize: 28, fontWeight: 500, pb: 5 }}>
        Create a new account
      </Box>
      <FormControl sx={{ width: "80%" }}>
        <TextField
          label="Username"
          variant="outlined"
          inputRef={nameRef}
          sx={{ pb: 2 }}
        />
        <TextField
          label="Email"
          variant="outlined"
          inputRef={emailRef}
          sx={{ pb: 2 }}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          inputRef={passwordRef}
          sx={{ pb: 2 }}
        />
        <TextField
          label="Retype Password"
          variant="outlined"
          type="password"
          inputRef={repeatPasswordRef}
          sx={{ pb: 5 }}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{
            width: "100%",
            alignSelf: "center",
            borderRadius: "5px",
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.primaryAlpha.main})`,
            py: "18px",
          }}
        >
          Register
        </Button>
      </FormControl>
    </Container>
  );
}
