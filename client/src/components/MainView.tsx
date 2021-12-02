import { ExitToApp } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Toolbar
} from "@mui/material";
import { useCallback, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { TaskCreator } from "./task/TaskCreator";
import { TasksView } from "./task/TasksView";
import { TeamRoute } from "./team";
import { TeamsView } from "./team/TeamsView";

const drawerWidth = 450;

const manuItems = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "Teams", url: "/teams" },
  { name: "Issues", url: "/issues" },
  { name: "Search issues", url: "/search-issue" },
];

export function MainView() {
  const [open, setOpen] = useState<boolean>(false);

  const toggleVisibility = useCallback(() => {
    setOpen((s) => !s);
  }, [setOpen]);

  return (
    <Router>
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              background: (theme) => `${theme.palette.background.default}`,
              color: (theme) => `${theme.palette.primary.main}`,
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar sx={{ flex: 1 }} />
          <List>
            {manuItems.map((itemObject, index) => (
              <Link
                to={itemObject.url}
                key={itemObject.url}
                style={{
                  textDecoration: "none",
                }}
              >
                <ListItemButton key={itemObject.name} sx={{ p: "20px" }}>
                  <ListItemText
                    primary={itemObject.name}
                    sx={{
                      textAlign: "center",
                      "& .MuiTypography": {
                        fontSize: "25px",
                      },
                    }}
                  />
                </ListItemButton>
              </Link>
            ))}
          </List>
          <Button onClick={toggleVisibility}>Create task</Button>
          <Toolbar sx={{ flex: 1 }} />
          <Divider />
          <IconButton>
            <ExitToApp fontSize="large" color="primary" />
          </IconButton>
        </Drawer>
        <Box
          sx={{
            flexGrow: 1,
            p: 3,
            boxSizing: "border-box",
          }}
        >
          <Routes>
            <Route path="dashboard" element={<TasksView />} />
            <Route path="teams" element={<TeamsView />} />
            <Route path="teams/team/:id" element={<TeamRoute />} />
            <Route path="issues" element={<TasksView />} />
            <Route path="search-issue" element={<TasksView />} />
          </Routes>
        </Box>
        <Modal open={open} onClose={toggleVisibility} sx={{ display: "flex" }}>
          <TaskCreator closeModal={toggleVisibility} />
        </Modal>
      </Box>
    </Router>
  );
}
