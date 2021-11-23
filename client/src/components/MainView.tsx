import { ExitToApp } from "@mui/icons-material";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar
} from "@mui/material";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { TasksView } from "./task/TasksView";
import { TeamsView } from "./team/TeamsView";

const drawerWidth = 450;

const manuItems = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "Teams", url: "/teams" },
  { name: "Issues", url: "/issues" },
  { name: "Search issues", url: "/search-issue" },
  { name: "Create task", url: "/create-task" },
];

export function MainView() {
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
            height: "100vh",
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <Routes>
            <Route path="dashboard" element={<TasksView />} />
            <Route path="teams" element={<TeamsView />} />
            <Route path="issues" element={<TasksView />} />
            <Route path="search-issue" element={<TasksView />} />
            <Route path="create-task" element={<TasksView />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}
