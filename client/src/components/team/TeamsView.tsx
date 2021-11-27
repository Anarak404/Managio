import { Box, Button, Modal, Typography } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import { appContext } from "../../AppContext";
import { TeamCreator } from "./TeamCreator";
import { TeamItem } from "./TeamItem";

export function TeamsView() {
  const [open, setOpen] = useState<boolean>(false);

  const { teams, getTeams } = useContext(appContext);

  const toggleVisibility = useCallback(() => {
    setOpen((s) => !s);
  }, [setOpen]);

  useEffect(() => {
    getTeams();
  }, [getTeams]);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography sx={{ fontSize: "50px", fontWeight: "bold", p: "80px" }}>
        Teams
      </Typography>
      <Box sx={{ p: "0 50px", overflowY: "auto", height: "100%" }}>
        {teams.map((t) => (
          <Box sx={{ p: "10px" }} key={t.id}>
            <TeamItem team={t} />
          </Box>
        ))}
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "row-reverse", p: "20px 60px" }}
      >
        <Button
          variant="contained"
          sx={{ p: "10px 20px", fontSize: "20px" }}
          onClick={toggleVisibility}
        >
          Create Team
        </Button>
        <Modal open={open} onClose={toggleVisibility} sx={{ display: "flex" }}>
          <TeamCreator closeModal={toggleVisibility} />
        </Modal>
      </Box>
    </Box>
  );
}
