import {
  Box,
  Button,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useRef, useState } from "react";
import { createTeamApi } from "../../api/team";
import { ITeamRequest } from "../../api/types";

export function TeamCreator() {
  const [open, setOpen] = useState<boolean>(true);
  const [name, setName] = useState<string>();
  const [photo, setPhoto] = useState<string>();
  const [message, setMessage] = useState<string>();

  const photoRef = useRef<HTMLInputElement>(null);
  const NameRef = useRef<HTMLInputElement>(null);

  const onNameChange = useCallback(
    (s: React.ChangeEvent<HTMLInputElement>) => {
      setName(s.target.value);
    },
    [setName]
  );

  const onPhotoChange = useCallback(
    (s: React.ChangeEvent<HTMLInputElement>) => {
      setPhoto(s.target.value);
    },
    [setPhoto]
  );

  const handleClose = useCallback(() => {
    setOpen((s) => !s);
  }, []);

  const handleCreate = useCallback(() => {
    const photo = photoRef.current?.value || "";
    const name = NameRef.current?.value || "";

    if (name.length === 0) {
      setMessage("Name can not be empty!");
      return;
    }

    const data: ITeamRequest = { name: name, photo: photo };

    createTeamApi(data)
      .then((x) => setOpen((s) => !s))
      .catch((e) => {
        setMessage("Operation failed");
      });
  }, [setMessage]);

  return (
    <Modal open={open} sx={{ display: "flex" }}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "330px",
          p: "20px 40px",
          margin: "auto",
        }}
      >
        <Typography variant="h6" sx={{ p: "10px" }}>
          Photo
        </Typography>
        <TextField
          variant="outlined"
          value={photo}
          onChange={onPhotoChange}
          inputRef={photoRef}
        />
        <Typography variant="h6" sx={{ p: "10px" }}>
          Team name
        </Typography>
        <TextField
          variant="outlined"
          value={name}
          onChange={onNameChange}
          inputRef={NameRef}
        />
        {message && (
          <Typography sx={{ alignSelf: "center", py: "15px", color: "red" }}>
            {message}
          </Typography>
        )}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            py: "10px",
            marginTop: "auto",
          }}
        >
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleCreate}>
            Craete
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
}
