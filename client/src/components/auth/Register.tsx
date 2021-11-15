import {
  Box,
  Button,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useRef, useState } from "react";
import { signUpApi } from "../../api/auth";
import { appContext } from "../../AppContext";

export function Register() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const repeatPasswordRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<string>();

  const { signIn } = useContext(appContext);

  const handleSubmit = useCallback(() => {
    const name = nameRef.current?.value || "";
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";
    const repeatedPassword = repeatPasswordRef.current?.value || "";

    if (name.length === 0) {
      setMessage("Name can not be empty!");
      return;
    }

    if (email.length === 0) {
      setMessage("Email can not be empty!");
      return;
    }

    if (password.length === 0) {
      setMessage("Password can not be empty!");
      return;
    }

    if (repeatedPassword !== password) {
      setMessage("Passwords are different!");
      return;
    }

    setMessage(undefined);

    const credentials = { email, name, password };

    signUpApi(credentials)
      .then((x) => signIn(x, credentials))
      .catch(() => {
        setMessage("Registration failed!");
      });
  }, [signIn, setMessage]);

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
        {message && (
          <Typography sx={{ alignSelf: "center", color: "red", pb: "10px" }}>
            {message}
          </Typography>
        )}
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
          onClick={handleSubmit}
        >
          Register
        </Button>
      </FormControl>
    </Container>
  );
}
