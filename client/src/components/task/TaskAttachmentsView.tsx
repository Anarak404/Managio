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
          border: (theme) => `1px solid ${theme.labelBackGroundColor}`,
          borderRadius: "5px",
          fontSize: "18px",
          p: "10px",
          bgcolor: (theme) => `${theme.secondaryBackgroundColor}`,
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
