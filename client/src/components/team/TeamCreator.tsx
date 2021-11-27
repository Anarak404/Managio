import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { createTeamApi, updateTeamApi } from "../../api/team";
import { ITeam, ITeamRequest } from "../../api/types";
import { appContext } from "../../AppContext";

interface IProps {
  closeModal(): void;
  team?: ITeam;
}

export const TeamCreator = React.memo(function TeamCreator({
  closeModal,
  team: teamProps,
}: IProps) {
  const { getTeams } = useContext(appContext);
  const [team, setTeam] = useState<Pick<ITeam, "name" | "photo" | "id">>(() => {
    if (teamProps) {
      return { ...teamProps };
    }
    return {
      id: 0,
      name: "",
      photo: "",
    };
  });
  const [message, setMessage] = useState<string>();
  const [inEdit, setInEdit] = useState(!!teamProps);

  useEffect(() => {
    setInEdit(!!teamProps);
  }, [teamProps, setInEdit]);

  const onNameChange = useCallback(
    (s: React.ChangeEvent<HTMLInputElement>) => {
      setTeam((team) => ({ ...team, name: s.target.value }));
    },
    [setTeam]
  );

  const onPhotoChange = useCallback(
    (s: React.ChangeEvent<HTMLInputElement>) => {
      setTeam((team) => ({ ...team, photo: s.target.value }));
    },
    [setTeam]
  );

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleCreate = () => {
    const photo = team.photo;
    const name = team.name;

    if (name.length === 0) {
      setMessage("Name can not be empty!");
      return;
    }

    const data: ITeamRequest = { name, photo };

    if (inEdit) {
      updateTeamApi(data, team.id)
        .then((response) => {
          getTeams();
          closeModal();
        })
        .catch((e) => {
          setMessage("Operation failed");
        });
    } else {
      createTeamApi(data)
        .then((x) => closeModal())
        .catch((e) => {
          setMessage("Operation failed");
        });
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "330px",
        p: "20px 40px",
        maxWidth: "300px",
        margin: "auto",
      }}
    >
      <Typography variant="h6" sx={{ p: "10px" }}>
        Photo
      </Typography>
      <TextField
        variant="outlined"
        onChange={onPhotoChange}
        value={team.photo}
      />
      <Typography variant="h6" sx={{ p: "10px" }}>
        Team name
      </Typography>
      <TextField variant="outlined" onChange={onNameChange} value={team.name} />
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
          {team ? "Save" : "Create"}
        </Button>
      </Box>
    </Paper>
  );
});
