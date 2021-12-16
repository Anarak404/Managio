import { ExitToApp } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Modal,
  Toolbar,
} from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import { appContext } from "../AppContext";
import { DashboardView } from "./dashboard/DashboardView";
import { ProfileSettingsView } from "./profile-settings/ProfileSettingsView";
import { TaskRoute } from "./task";
import { TaskCreator } from "./task/create-task/TaskCreator";
import { TasksView } from "./task/TasksView";
import { TeamRoute } from "./team";
import { TeamsView } from "./team/TeamsView";

const drawerWidth = 450;

const manuItems = [
  { name: "Dashboard", url: "/dashboard" },
  { name: "Teams", url: "/teams" },
  { name: "Issues", url: "/issues" },
];

export function MainView() {
  const [open, setOpen] = useState<boolean>(false);
  const { me, logout } = useContext(appContext);

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
          <Link
            to={"settings"}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <IconButton>
              <Avatar src={me?.photo} />
            </IconButton>
          </Link>
          <Divider />
          <IconButton
            onClick={logout}
            sx={{ width: "fit-content", alignSelf: "center" }}
          >
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
            <Route path="dashboard" element={<DashboardView />} />
            <Route path="teams" element={<TeamsView />} />
            <Route path="teams/team/:id" element={<TeamRoute />} />
            <Route path="issues" element={<TasksView />} />
            <Route path="issues/issue/:id" element={<TaskRoute />} />
            <Route path="settings" element={<ProfileSettingsView />} />
          </Routes>
        </Box>
        <Modal open={open} onClose={toggleVisibility} sx={{ display: "flex" }}>
          <TaskCreator closeModal={toggleVisibility} />
        </Modal>
      </Box>
    </Router>
  );
}
