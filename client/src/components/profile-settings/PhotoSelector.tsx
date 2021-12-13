import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Typography
} from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { changePhotoApi } from "../../api/profile";
import { IPhoto } from "../../api/types";
import { appContext } from "../../AppContext";

interface IProps {
  closeModal(): void;
  photo?: string;
}

export function PhotoSelector({ photo, closeModal }: IProps) {
  const [selectedImage, setSelectedImage] = useState<Blob>();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(photo);
  const [message, setMessage] = useState<string>();

  const { updateProfile } = useContext(appContext);

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
      };
      reader.readAsDataURL(file);
    },
    [setSelectedImage, setImagePreviewUrl]
  );

  const removeSelectedImage = useCallback(() => {
    setSelectedImage(undefined);
    setImagePreviewUrl("");
  }, [setSelectedImage, setImagePreviewUrl]);

  const handleClose = useCallback(() => {
    closeModal();
  }, [closeModal]);

  const handleSubmit = useCallback(() => {
    const photo = selectedImage;
    const data: IPhoto = { photo };

    changePhotoApi(data)
      .then((response) => {
        updateProfile(response);
        closeModal();
      })
      .catch(() => setMessage("Operation failed"));
  }, [closeModal, selectedImage, updateProfile]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "400px",
        p: "20px 40px",
        maxWidth: "200px",
        margin: "auto",
      }}
    >
      <Typography variant="h6" sx={{ p: "10px" }}>
        Photo
      </Typography>
      <div>
        <Avatar
          src={imagePreviewUrl}
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
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </Box>
    </Paper>
  );
}
