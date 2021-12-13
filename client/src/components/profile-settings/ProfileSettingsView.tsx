import EditIcon from "@mui/icons-material/Edit";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import React, { useCallback, useContext, useState } from "react";
import { appContext } from "../../AppContext";
import { NameChangeDialog } from "./NameChangeDialog";
import { PasswordChangeDialog } from "./PasswordChangeDialog";
import { PhotoSelector } from "./PhotoSelector";

export function ProfileSettingsView() {
  const { me } = useContext(appContext);

  const [editPhotoOpen, setEditPhotoOpen] = useState<boolean>(false);
  const [changeNameDialogOpen, setChangeNameDialogOpen] =
    useState<boolean>(false);
  const [changePasswordDialogOpen, setChangePasswordDialogOpen] =
    useState<boolean>(false);

  const togglePhotoSelectorVisibility = useCallback(() => {
    setEditPhotoOpen((s) => !s);
  }, [setEditPhotoOpen]);

  const togglePasswordDialogVisibility = useCallback(() => {
    setChangePasswordDialogOpen((s) => !s);
  }, [setChangePasswordDialogOpen]);

  const toggleNameDialogVisibility = useCallback(() => {
    setChangeNameDialogOpen((s) => !s);
  }, [setChangeNameDialogOpen]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{ p: "10px 150px", mr: "auto", fontWeight: "bold" }}
        variant="h4"
      >
        My account
      </Typography>
      <Paper sx={{ bgcolor: "red", height: "70vh", width: "60vw" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "30px",
            p: "30px 60px",
          }}
        >
          <Box sx={{ display: "flex" }}>
            <Avatar src={me?.photo} sx={{ width: "150px", height: "150px" }} />
            <IconButton
              onClick={togglePhotoSelectorVisibility}
              sx={{ height: "fit-content", alignSelf: "flex-end" }}
            >
              <EditIcon />
            </IconButton>
          </Box>
          <Typography variant="h4">{me?.name}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            height: "65%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: "10px 60px",
          }}
        >
          <Paper
            sx={{
              bgcolor: "green",
              width: "100%",
              height: "80%",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              p: "8px",
            }}
          >
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">EMAIL:</Typography>
              <Typography sx={{ ml: "80px" }}>{me?.email}</Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6">NAME:</Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ ml: "80px" }}>{me?.name}</Typography>
                <IconButton onClick={toggleNameDialogVisibility}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
            <Divider />
            <Button
              variant="outlined"
              onClick={togglePasswordDialogVisibility}
              sx={{
                width: "fit-content",
                my: "8px",
                alignSelf: "center",
                mt: "auto",
              }}
            >
              Change password
            </Button>
          </Paper>
        </Box>
      </Paper>
      <Modal open={editPhotoOpen} onClose={togglePhotoSelectorVisibility}>
        <PhotoSelector
          photo={me?.photo}
          closeModal={togglePhotoSelectorVisibility}
        />
      </Modal>
      <Modal
        open={changePasswordDialogOpen}
        onClose={togglePasswordDialogVisibility}
      >
        <PasswordChangeDialog closeModal={togglePasswordDialogVisibility} />
      </Modal>
      <Modal open={changeNameDialogOpen} onClose={toggleNameDialogVisibility}>
        <NameChangeDialog closeModal={toggleNameDialogVisibility} />
      </Modal>
    </Box>
  );
}
