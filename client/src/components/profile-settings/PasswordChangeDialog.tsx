import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { changePasswordApi } from "../../api/profile";
import { IPasswordRequest } from "../../api/types";

interface IProps {
  closeModal(): void;
}

export function PasswordChangeDialog({ closeModal }: IProps) {
  const currentPasswordRef = useRef<HTMLInputElement>(null);
  const newPasswordRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<string>();

  const handleSubmit = useCallback(() => {
    const currentPassword = currentPasswordRef.current?.value || "";
    const newPassword = newPasswordRef.current?.value || "";

    if (currentPassword.length === 0 || newPassword.length === 0) {
      setMessage("Fields can not be empty!");
      return;
    }

    setMessage(undefined);

    const data: IPasswordRequest = { currentPassword, newPassword };

    changePasswordApi(data)
      .then(() => closeModal())
      .catch(() => setMessage("Operation failed!"));
  }, [setMessage, closeModal]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "300px",
        p: "20px 40px",
        maxWidth: "250px",
        margin: "auto",
      }}
    >
      <Typography>Current Password</Typography>
      <TextField
        type="password"
        inputRef={currentPasswordRef}
        variant="outlined"
      />
      <Typography>New Password</Typography>
      <TextField type="password" inputRef={newPasswordRef} variant="outlined" />
      <Button variant="outlined" onClick={handleSubmit} sx={{ my: "10px" }}>
        ChangePassword
      </Button>
      {message && (
        <Typography sx={{ alignSelf: "center", color: "red", pb: "10px" }}>
          {message}
        </Typography>
      )}
    </Paper>
  );
}
