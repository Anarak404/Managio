import { Button, TextField, Typography } from "@mui/material";
import React, { useCallback, useEffect, useReducer, useRef } from "react";
import { addCommentApi, getAllCommentsApi } from "../../../api/comment";
import { CommentItem } from "./CommentItem";
import { commentReducer, commentsInitialState } from "./commentReducer";

interface IProps {
  id: number;
}

export function CommentsView({ id }: IProps) {
  const commentRef = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(commentReducer, commentsInitialState);
  const { comments, loading, pageable, totalItems } = state;

  const handleSubmit = useCallback(() => {
    if (!commentRef.current) {
      return;
    }
    const description = commentRef.current.value || "";

    if (description.length === 0) {
      return;
    }

    addCommentApi(id, { description }).then((comment) =>
      dispatch({ type: "addComment", data: comment })
    );
    commentRef.current.value = "";
  }, [id]);

  const handleLoadMore = useCallback(() => {
    dispatch({ type: "loadMore" });
  }, [dispatch]);

  useEffect(() => {
    getAllCommentsApi(id, pageable).then((c) => {
      dispatch({
        type: "commentsLoaded",
        data: {
          comments: c.comments,
          totalItems: c.totalItems,
        },
      });
    });
  }, [dispatch, id, pageable]);

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
      {comments.map((c) => (
        <CommentItem comment={c} key={c.id} />
      ))}
      {totalItems > comments.length && (
        <Button
          onClick={handleLoadMore}
          disabled={loading}
          variant="outlined"
          sx={{ width: "150px", alignSelf: "center" }}
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
}
