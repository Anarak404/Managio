import { Button, Paper, TextField, Typography } from "@mui/material";
import React, { useCallback, useContext, useRef, useState } from "react";
import { changeNameApi } from "../../api/profile";
import { INameRequest } from "../../api/types";
import { appContext } from "../../AppContext";

interface IProps {
  closeModal(): void;
}

export function NameChangeDialog({ closeModal }: IProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>();

  const { updateProfile } = useContext(appContext);

  const handleSubmit = useCallback(() => {
    const name = nameRef.current?.value || "";

    if (name.length === 0) {
      setMessage("Name can not be empty!");
      return;
    }

    setMessage(undefined);

    const data: INameRequest = { name };

    changeNameApi(data)
      .then((response) => {
        updateProfile(response);
        closeModal();
      })
      .catch(() => setMessage("Operation failed!"));
  }, [setMessage, closeModal, updateProfile]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "200px",
        p: "20px 40px",
        maxWidth: "300px",
        margin: "auto",
        gap: "20px",
      }}
    >
      <Typography>Enter new name</Typography>
      <TextField inputRef={nameRef} />
      <Button variant="outlined" onClick={handleSubmit}>
        Save changes
      </Button>
      {message && (
        <Typography sx={{ alignSelf: "center", color: "red", pb: "10px" }}>
          {message}
        </Typography>
      )}
    </Paper>
  );
}
