import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { IComment } from "../../../api/types";
import { dateFormatter } from "../../../utils/dateFormatter";

interface IProps {
  comment: IComment;
}

export function CommentItem({ comment }: IProps) {
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Avatar src={comment.user.photo} />
        <Typography>{comment.user.name}</Typography>
        <Typography sx={{ ml: "auto", fontStyle: "italic" }}>
          {dateFormatter(comment.time)}
        </Typography>
      </Box>
      <Box
        sx={{
          marginLeft: "50px",
          p: "5px",
          border: "1px solid #555",
          borderRadius: "8px",
        }}
      >
        {comment.description}
      </Box>
    </Box>
  );
}
