import { TableCell, TableHead, TableRow } from "@mui/material";
import React from "react";

const headCells = ["Title", "Priority", "Status", "Labels", "Assigned User"];

export function EnhancedTableHead() {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((cell, index) => (
          <TableCell key={index}>{cell}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
