import {
  Autocomplete,
  Box,
  Button,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  createTaskApi,
  getConfigApi,
  saveAttachmentsApi,
} from "../../../api/task";
import { getMembersApi } from "../../../api/team";
import { ILabel, ITaskRequest, ITeam, IUser } from "../../../api/types";
import { appContext } from "../../../AppContext";
import { isBlob } from "../../../utils/isBlob";
import { Attachments } from "./Attachments";
import { LabelSelector } from "./LabelSelector";

interface IProps {
  closeModal(): void;
}

export function TaskCreator({ closeModal }: IProps) {
  const [priorities, setPriorities] = useState<string[]>([]);
  const [labels, setLabels] = useState<ILabel[]>([]);
  const [members, setMembers] = useState<IUser[]>([]);
  const [message, setMessage] = useState<string>();
  const [selectedPriority, setSelectedPriotity] = useState<string>("");
  const [selectedLabels, setSelectedLabels] = useState<ILabel[]>([]);
  const [assignedTeam, setAssignedTeam] = useState<ITeam>();
  const [assignedUser, setAssignedUser] = useState<IUser>();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const attachments = useRef([] as File[]);

  const { teams } = useContext(appContext);

  const handlePriority = (e: React.SyntheticEvent, value: string | null) => {
    if (value) {
      setSelectedPriotity(value);
    } else {
      setSelectedPriotity("");
    }
  };

  const handleLabels = (labels: ILabel[]) => {
    setSelectedLabels(labels);
  };

  const assigneeTeam = useCallback(
    (e: React.SyntheticEvent, value: ITeam | null) => {
      if (value === null) {
        setMessage("Team must be specified!");
        return;
      }

      setAssignedTeam(value);

      getMembersApi(value.id)
        .then((response) => setMembers(response))
        .catch(() => setMessage("Getting team members failed!"));
    },
    [setMembers, setMessage, setAssignedTeam]
  );

  const assigneeUser = useCallback(
    (e: React.SyntheticEvent, value: IUser | null) => {
      if (value === null) {
        setAssignedUser(undefined);
        setMessage("Usr must be specified!");
        return;
      }
      setAssignedUser(value);
    },
    [setMessage]
  );

  const handleSubmit = useCallback(() => {
    const title = titleRef.current?.value || "";
    const description = descriptionRef.current?.value || "";

    if (title.length === 0) {
      setMessage("Title must be specified!");
      return;
    }

    if (description.length === 0) {
      setMessage("Description must be specified!");
      return;
    }

    if (!assignedTeam) {
      setMessage("Team must be specified!");
      return;
    }

    if (!assignedUser) {
      setMessage("User must be specified!");
      return;
    }

    setMessage(undefined);
    const teamId = assignedTeam.id;
    const userId = assignedUser.id;
    const priority = selectedPriority ? selectedPriority : "";

    const labels: ILabel[] = selectedLabels;

    const credentials: ITaskRequest = {
      title,
      description,
      userId,
      teamId,
      priority,
      labels,
    };

    createTaskApi(credentials)
      .then((task) => {
        if (attachments.current.length > 0) {
          const files: Blob[] = [
            ...attachments.current.filter((attachment) => isBlob(attachment)),
          ];

          saveAttachmentsApi(task.id, files).then(() => closeModal());
        } else {
          closeModal();
        }
      })
      .catch(() => setMessage("Operation failed!"));
  }, [
    setMessage,
    assignedUser,
    assignedTeam,
    selectedPriority,
    selectedLabels,
    closeModal,
  ]);

  useEffect(() => {
    getConfigApi()
      .then((response) => {
        setLabels(response.labels);
        setPriorities(response.priorities);
      })
      .catch(() => {});
  }, [setPriorities, setLabels]);

  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "900px",
        p: "20px 40px",
        width: "1000px",
        margin: "auto",
        gap: "5px",
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: "bold", pb: "15px" }}>
        Create Task
      </Typography>
      <Box
        sx={{ display: "flex", alignItems: "center", pb: "10px", gap: "20px" }}
      >
        <Typography variant="h5">Title</Typography>
        <TextField inputRef={titleRef} sx={{ width: "100%" }}></TextField>
      </Box>
      <Typography variant="h6">Description</Typography>
      <TextField inputRef={descriptionRef} multiline rows="10"></TextField>
      <Attachments attachmentsRef={attachments} />
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <label style={{ width: "150px" }}>Choose Team</label>
        <Autocomplete
          onChange={assigneeTeam}
          options={teams}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: "400px" }} />
          )}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <label style={{ width: "150px" }}>Assigned User</label>
        <Autocomplete
          onChange={assigneeUser}
          options={members}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: "400px" }} />
          )}
        />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <label>Priority</label>
        <Autocomplete
          options={priorities}
          onChange={handlePriority}
          renderInput={(params) => (
            <TextField {...params} sx={{ width: "200px" }} />
          )}
        />
      </Box>
      <LabelSelector labels={labels} handleLabels={handleLabels} />
      {message && (
        <Typography sx={{ alignSelf: "center", color: "red" }}>
          {message}
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          p: "20px",
          marginTop: "auto",
        }}
      >
        <Button variant="contained" onClick={handleSubmit}>
          Create task
        </Button>
      </Box>
    </Paper>
  );
}
