import {
  Box,
  Button,
  Container,
  FormControl,
  Link,
  TextField
} from "@mui/material";
import React, { useRef } from "react";

export function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

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
