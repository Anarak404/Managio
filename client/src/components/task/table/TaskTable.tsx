import {
  Avatar,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { IParams, ITask } from "../../../api/types";
import { EnhancedTableHead } from "./EnhancedTableHead";

interface IProps {
  tasks: ITask[];
  handleDecision(data: IParams): void;
  totalItems: number;
  page: number;
  rowsPerPage: number;
}

export function TaskTable({
  tasks,
  handleDecision,
  totalItems,
  page,
  rowsPerPage,
}: IProps) {
  const handleChangePage = (event: unknown, newPage: number) => {
    handleDecision({ page: newPage, size: rowsPerPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    handleDecision({ page: 0, size: parseInt(event.target.value) });
  };

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tasks.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size="small"
          >
            <EnhancedTableHead />
            <TableBody>
              {tasks
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                      component={Link}
                      to={`issue/${row.id}`}
                      sx={{ textDecoration: "none" }}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell>{row.priority}</TableCell>
                      <TableCell>{row.status}</TableCell>
                      <TableCell>
                        {row.labels.map((l) => (
                          <label>{l}</label>
                        ))}
                      </TableCell>
                      <TableCell>
                        <Avatar
                          src={row.assignedUser.photo}
                          sx={{ width: "30px", height: "30px" }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={totalItems}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
