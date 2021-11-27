import { Box } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTeamApi } from "../../api/team";
import { ITeamDetails } from "../../api/types";
import { appContext } from "../../AppContext";
import { TeamDetailsHeader } from "./TeamDetailsHeader";
import { TeamMembers } from "./TeamMembers";

type Params = "id";

export function TeamDetailsView() {
  const [team, setTeam] = useState<ITeamDetails>({
    id: 0,
    name: "",
    photo: "",
    owner: {
      name: "",
      email: "",
      photo: "",
    },
    teamMembers: [],
  });

  const { id } = useParams<Params>();
  const { me } = useContext(appContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!id || isNaN(+id)) {
      navigate("/dashboard", { replace: true });
    } else {
      getTeamApi(+id)
        .then((e) => {
          setTeam(e);
        })
        .catch((e) => {});
    }
  }, [setTeam, navigate, id, me]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", gap: "15px", px: "80px" }}
    >
      <TeamDetailsHeader team={team} isOwner={team.owner.email === me?.email} />
      <Box sx={{ height: "500px", bgcolor: "red" }}>Tablica Kanban</Box>
      <TeamMembers
        members={team.teamMembers}
        isOwner={team.owner.email === me?.email}
      />
    </Box>
  );
}
