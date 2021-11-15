import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useRef, useState } from "react";
import { signInApi } from "../../api/auth";
import { appContext } from "../../AppContext";

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<string>();

  const { signIn } = useContext(appContext);

  const handleSubmit = useCallback(() => {
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    if (email.length === 0) {
      setMessage("Email can not be empty!");
      return;
    }

    if (password.length === 0) {
      setMessage("Password can not be empty!");
      return;
    }

    setMessage(undefined);

    const credentials = { email, password };

    signInApi(credentials)
      .then((x) => signIn(x, credentials))
      .catch((e) => {
        setMessage("Login failed!");
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
        Sign in to your account
      </Box>
      <FormControl sx={{ width: "80%" }}>
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
          sx={{ pb: 5 }}
        />
        {message && (
          <Typography sx={{ alignSelf: "center", color: "red", pb: "10px" }}>
            {message}
          </Typography>
        )}
        <Button
          variant="contained"
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
          Log in
        </Button>
        <Box sx={{ height: "25px" }} />
        <Link
          variant="body2"
          component="button"
          color="secondary"
          sx={{ fontSize: "16px", alignSelf: "center" }}
        >
          Fogot password?
        </Link>
      </FormControl>
    </Container>
  );
}
