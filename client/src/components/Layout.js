import React from "react";
import { useHistory } from "react-router-dom";
import {
  makeStyles,
  AppBar,
  Toolbar,
  Drawer,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MenuIcon from "@material-ui/icons/Menu";
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const drawerWidth = 240;

const useStyle = makeStyles({
  appbarUnToggle: {
    width: "100%",
  },
  appbar: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  drawerUnToggle: {
    width: 0,
  },
  drawer: {
    width: drawerWidth,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerPaperUnToggle: {
    width: 0,
  },
  page: {
    width: `calc(100% - ${drawerWidth}px)`,
  },
  pageUntoggle: {
    width: "100%",
  },
});

function Layout({ children }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyle();
  const tab = useHistory();

  //Handling user sign in sign out----
  const user = JSON.parse(localStorage.getItem("profile"));

  //----

  const login = [
    {
      title: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      title: "Create Post",
      icon: <CreateIcon />,
      path: "/create",
    },
    {
      title: "Sign Out",
      icon: <ExitToAppIcon />,
      path: "/signout",
    },
  ];

  const logout = [
    {
      title: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      title: "Sign up",
      icon: <HowToRegIcon />,
      path: "/signup",
    },
    {
      title: "Sign in",
      icon: <LockOpenIcon />,
      path: "/signin",
    },
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <AppBar
          className={open ? classes.appbar : classes.appbarUnToggle}
          elevation={0}
        >
          <Toolbar style={{ justifyContent: "space-between" }}>
            <MenuIcon
              style={{ cursor: "pointer", fontSize: "2rem" }}
              onClick={() => {
                open ? setOpen(false) : setOpen(true);
              }}
            />
            <Typography variant="h5" align="center">
              Instant Media
            </Typography>
            <div></div>
          </Toolbar>
        </AppBar>
        <Drawer
          className={open ? classes.drawer : classes.drawerUnToggle}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <List>
            <ListItem>
              <Typography
                style={{ padding: "4px" }}
                variant="h6"
                align="center"
              >
                Instant Media
              </Typography>
              <ListItemIcon style={{ cursor: "pointer", marginLeft: "1rem" }}>
                <ArrowBackIosIcon
                  onClick={() => {
                    open ? setOpen(false) : setOpen(true);
                  }}
                />
              </ListItemIcon>
            </ListItem>
            <Divider />
            {user !== null
              ? login.map((item) => (
                  <ListItem
                    button
                    key={item.title}
                    onClick={() => {
                      tab.push(item.path);
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText text="primary">{item.title}</ListItemText>
                  </ListItem>
                ))
              : logout.map((item) => (
                  <ListItem
                    button
                    key={item.title}
                    onClick={() => {
                      tab.push(item.path);
                    }}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText text="primary">{item.title}</ListItemText>
                  </ListItem>
                ))}
          </List>
        </Drawer>

        <div className={open ? classes.page : classes.pageUntoggle}>
          <div style={{ marginTop: "80px" }}></div>
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
