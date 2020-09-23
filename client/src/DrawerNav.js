import React, { useState } from "react";
import { connect } from "react-redux";
// import { Route, Switch, Link, Redirect } from "react-router-dom";
import { Redirect } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectIsAthenticated,
} from "./redux/user/user.selector";

import { signOutStart } from "./redux/user/user.actions";

import Todo from "./pages/Todo";

import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuIcon from "@material-ui/icons/Menu";
import { LinearProgress, MenuItem } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const DrawerNav = ({ signOutStart, currentUser, isAuthenticated }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSignout = async () => {
    console.log("test logout");
    signOutStart();
  };

  const handleMenu = (event) => {
    setOpen(!open);
    if (!anchorEl) setAnchorEl(event.currentTarget);
    else setAnchorEl(null);
  };

  return !isAuthenticated ? (
    <LinearProgress />
  ) : !currentUser ? (
    <Redirect to="/login" />
  ) : (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Welcome, {currentUser.name}
          </Typography>
          <div>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={open}
              onClose={handleMenu}
            >
              <MenuItem onClick={handleSignout}>Logout</MenuItem>
              <MenuItem onClick={handleMenu}>My account</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Todo />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isAuthenticated: selectIsAthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStart: () => dispatch(signOutStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(DrawerNav);
