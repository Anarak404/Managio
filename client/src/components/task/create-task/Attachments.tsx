import DeleteIcon from "@mui/icons-material/Delete";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface IProps {
  attachmentsRef: React.MutableRefObject<File[]>;
}

export function Attachments({ attachmentsRef }: IProps) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone();

  const [files, setFiles] = useState(acceptedFiles);

  const handleRemove = useCallback(
    (index: number) => {
      acceptedFiles.splice(index, 1);
      setFiles([...acceptedFiles]);
    },
    [acceptedFiles, setFiles]
  );

  useEffect(() => {
    setFiles([...acceptedFiles]);
  }, [acceptedFiles, setFiles]);

  useEffect(() => {
    attachmentsRef.current = [...files];
  }, [attachmentsRef, files]);

  return (
    <section className="container" style={{ border: "1px solid" }}>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside>
        {acceptedFiles.length > 0 && (
          <React.Fragment>
            <Typography>Selected files</Typography>
            {files.map((file, index) => {
              return (
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton onClick={() => handleRemove(index)}>
                    <DeleteIcon />
                  </IconButton>
                  <Typography>{file.name}</Typography>
                </Box>
              );
            })}
          </React.Fragment>
        )}
      </aside>
    </section>
  );
}
