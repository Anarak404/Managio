import AddIcon from "@mui/icons-material/Add";
import { Box, Button, IconButton, Paper, TextField } from "@mui/material";
import React, { useCallback, useContext, useRef, useState } from "react";
import { addMembersApi } from "../../../api/team";
import { ITeamMembersRequest } from "../../../api/types";
import { appContext } from "../../../AppContext";
import { teamContext } from "../../../contexts/TeamContext";
import { InvitationItem } from "./InvitationItem";

interface IProps {
  closeModel(): void;
}

export function Invitation({ closeModel }: IProps) {
  const [emails, setEmails] = useState<string[]>([]);

  const ref = useRef<HTMLInputElement>(null);

  const { team } = useContext(teamContext);
  const { getTeams } = useContext(appContext);

  const handleAdd = useCallback(() => {
    if (!ref.current) {
      return;
    }
    const email = ref.current.value;
    if (email?.length === 0 || emails.includes(email)) {
      return;
    }
    ref.current.value = "";
    setEmails((emails) => [...emails, email]);
  }, [setEmails, emails]);

  const handleDelete = useCallback(
    (value: string) => {
      setEmails((emails) => emails.filter((email) => value !== email));
    },
    [setEmails]
  );

  const handleSubmit = useCallback(() => {
    if (emails.length === 0 || !team?.id) {
      return;
    }

    const data: ITeamMembersRequest = { emails };
    console.log(data);
    console.log(team.id);

    addMembersApi(data, team.id)
      .then((x) => {
        getTeams();
        closeModel();
      })
      .catch(() => {});
  }, [team, emails, closeModel, getTeams]);

  return (
    <Paper
      sx={{
        display: "flex",
        height: "500px",
        p: "20px 40px",
        maxWidth: "350px",
        margin: "auto",
        minWidth: "300px",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <TextField sx={{ flex: 1 }} inputRef={ref} />
        <IconButton sx={{ alignSelf: "center" }} onClick={handleAdd}>
          <AddIcon />
        </IconButton>
      </Box>
      <Box sx={{ flex: 1, overflowY: "scroll" }}>
        {emails.map((email, index) => (
          <InvitationItem
            key={index}
            email={email}
            delete={() => handleDelete(email)}
          />
        ))}
      </Box>
      <Button variant="contained" onClick={handleSubmit}>
        Add members
      </Button>
    </Paper>
  );
}
