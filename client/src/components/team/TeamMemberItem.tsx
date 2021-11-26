import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton } from "@mui/material";
import { IUser } from "../../api/types";

interface IProps {
  member: IUser;
  canModify: boolean;
}

export function TeamMemberItem({ member, canModify }: IProps) {
  return (
    <Box
      sx={{
        height: "60px",
        display: "flex",
        alignItems: "center",
        "&:hover": {
          bgcolor: "background.default",
          borderRadius: "10px",
        },
      }}
    >
      <Box
        sx={{
          height: "45px",
          width: "45px",
          bgcolor: "yellow",
          margin: "10px",
        }}
      >
        {member.photo}
      </Box>
      <Box sx={{ fontSize: "22px" }}>{member.name}</Box>
      <div style={{ flex: 1 }} />
      {canModify && (
        <Box sx={{ marginRight: "20px" }}>
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
