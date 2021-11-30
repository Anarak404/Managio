import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography
} from "@mui/material";
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
  const [selectedImage, setSelectedImage] = useState<Blob>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string>("");

  useEffect(() => {
    setInEdit(!!teamProps);
  }, [teamProps, setInEdit]);

  const onNameChange = useCallback(
    (s: React.ChangeEvent<HTMLInputElement>) => {
      setTeam((team) => ({ ...team, name: s.target.value }));
    },
    [setTeam]
  );

  const handleImageChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onloadend = () => {
        setSelectedImage(file);
        setImagePreviewUrl(reader.result as string);
        setTeam((team) => ({ ...team, photo: e.target.value }));
      };
      reader.readAsDataURL(file);
    },
    [setSelectedImage, setImagePreviewUrl, setTeam]
  );

  const removeSelectedImage = useCallback(() => {
    setSelectedImage(undefined);
    setImagePreviewUrl("");
    setTeam((team) => ({ ...team, photo: "" }));
  }, [setSelectedImage, setImagePreviewUrl, setTeam]);

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleCreate = () => {
    const photo = selectedImage;
    const name = team.name;

    if (name.length === 0) {
      setMessage("Name can not be empty!");
      return;
    }

    const data: ITeamRequest = { name, photo };

    if (inEdit) {
      updateTeamApi(data, team.id)
        .then(() => {
          getTeams();
          closeModal();
        })
        .catch((e) => {
          setMessage("Operation failed");
        });
    } else {
      createTeamApi(data)
        .then(() => {
          getTeams();
          closeModal();
        })
        .catch(() => {
          setMessage("Operation failed");
        });
    }
  };

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "500px",
        p: "20px 40px",
        maxWidth: "350px",
        margin: "auto",
      }}
    >
      <Typography variant="h6" sx={{ p: "10px" }}>
        Photo
      </Typography>
      <div>
        <Avatar
          src={imagePreviewUrl ? imagePreviewUrl : team.photo}
          sx={{ width: "200px", height: "200px" }}
        />
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={removeSelectedImage}>
            <DeleteIcon />
          </IconButton>
          <input
            accept="image/*"
            type="file"
            onChange={handleImageChange}
            id="select-image"
            style={{ display: "none" }}
          />
          <label htmlFor="select-image">
            <IconButton component="span">
              <AddCircleIcon />
            </IconButton>
          </label>
        </div>
      </div>
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
          {team.id ? "Save" : "Create"}
        </Button>
      </Box>
    </Paper>
  );
});
