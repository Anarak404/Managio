import { Button, TextField, Typography } from "@mui/material";
import React, { useCallback, useRef } from "react";
import { addCommentApi } from "../../../api/comment";

interface IProps {
  id: number;
}

export function CommentsView({ id }: IProps) {
  const commentRef = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(() => {
    if (!commentRef.current) {
      return;
    }
    const description = commentRef.current.value || "";

    if (description.length === 0) {
      return;
    }

    addCommentApi(id, { description }).then(() => console.log("dziala"));
    commentRef.current.value = "";
  }, [id]);

  return (
    <React.Fragment>
      <Typography variant="subtitle1">Comments</Typography>
      <TextField multiline rows={3} inputRef={commentRef}></TextField>
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{ ml: "auto", width: "150px" }}
      >
        Add
      </Button>
    </React.Fragment>
  );
}
