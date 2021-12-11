import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { getAllTasksApi, getFilteredTasksApi } from "../../api/task";
import {
  AcceptedField,
  AllowedOperators,
  IFilterValue,
  IParams,
} from "../../api/types";
import { TaskTable } from "./table/TaskTable";
import { taskReducer, tasksInitialState } from "./taskReducer";

type FiltersResult =
  | { success: true; filters: IFilterValue[] }
  | { success: false };

const getFilters = (search: string): FiltersResult => {
  if (search.length === 0) {
    return {
      success: false,
    };
  }

  const operations: string[] = search.split(/\s+and\s+/gi);
  const acceptedFields: AcceptedField[] = ["TITLE", "PRIORITY", "STATUS"];

  const filters = operations
    .map((o) =>
      o.split(/\s*(!?=)\s*/).map((field) => field.toUpperCase().trim())
    )
    .filter((fields) => {
      const key = fields[0] as AcceptedField;
      return acceptedFields.includes(key);
    })
    .map((fields) => {
      const operator: AllowedOperators = fields[1] === "=" ? "EQ" : "NOT_EQ";
      return {
        field: fields[0] as AcceptedField,
        value: fields[2],
        operator: operator,
      } as IFilterValue;
    });

  if (filters.length !== operations.length) {
    return {
      success: false,
    };
  }

  return {
    success: true,
    filters,
  };
};

export function TasksView() {
  const [state, dispatch] = useReducer(taskReducer, tasksInitialState);
  const searchRef = useRef<HTMLInputElement>(null);

  const { filters, pageable, tasks, totalItems, loading } = state;

  const handleDecision = useCallback(
    (data: IParams) => {
      dispatch({ type: "setPageable", data });

      if (filters !== undefined) {
        getFilteredTasksApi(data, { filters }).then((t) => {
          dispatch({
            type: "tasksLoaded",
            data: {
              tasks: t.tasks,
              totalItems: t.totalItems,
            },
          });
        });
        return;
      }

      getAllTasksApi(data).then((t) => {
        dispatch({
          type: "tasksLoaded",
          data: {
            tasks: t.tasks,
            totalItems: t.totalItems,
          },
        });
      });
    },
    [dispatch, filters]
  );

  const handleSearch = useCallback(() => {
    const search = searchRef.current?.value || "";
    const result = getFilters(search);

    if (!result.success) {
      console.log("error");
      return;
    }

    const filters = result.filters;
    dispatch({ type: "setFilters", data: filters });

    getFilteredTasksApi({ page: 0, size: pageable.size }, { filters }).then(
      (t) => {
        dispatch({
          type: "tasksLoaded",
          data: {
            tasks: t.tasks,
            totalItems: t.totalItems,
          },
        });
      }
    );
  }, [dispatch, pageable]);

  useEffect(() => {
    getAllTasksApi(tasksInitialState.pageable).then((t) => {
      dispatch({
        type: "tasksLoaded",
        data: {
          tasks: t.tasks,
          totalItems: t.totalItems,
        },
      });
    });
  }, [dispatch]);

  return (
    <Box>
      <Typography
        sx={{ fontSize: "50px", fontWeight: "bold", p: " 20px 50px" }}
      >
        Issues
      </Typography>
      <Box sx={{ display: "flex", gap: "30px" }}>
        <TextField
          multiline
          rows="2"
          inputRef={searchRef}
          sx={{ width: "80%" }}
        />
        <Button
          onClick={handleSearch}
          color="primary"
          variant="contained"
          sx={{ width: "150px", height: "50px" }}
        >
          Search
        </Button>
      </Box>

      <Box
        sx={{
          mt: "20px",
          ...(loading ? { justifyContent: "center", display: "flex" } : {}),
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <TaskTable
            tasks={tasks}
            handleDecision={handleDecision}
            totalItems={totalItems}
            page={pageable.page}
            rowsPerPage={pageable.size}
          />
        )}
      </Box>
    </Box>
  );
}
