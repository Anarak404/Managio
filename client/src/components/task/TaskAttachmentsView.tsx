import { Box, Typography } from "@mui/material";
import React from "react";
import { IAttachment } from "../../api/types";

interface IProps {
  attachments?: IAttachment[];
}

export function TaskAttachmentsView({ attachments }: IProps) {
  return (
    <React.Fragment>
      <Typography variant="subtitle1">Attachments</Typography>
      <Box
        sx={{
          border: "1px solid #9d977a",
          borderRadius: "5px",
          fontSize: "18px",
          p: "10px",
        }}
      >
        {attachments ? (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {attachments.map((attachment) => {
              return (
                <a
                  href={attachment.path}
                  download
                  target="_blank"
                  rel="noreferrer"
                >
                  {attachment.name}
                </a>
              );
            })}
          </Box>
        ) : (
          <Typography>No attachments found</Typography>
        )}
      </Box>
    </React.Fragment>
  );
}
