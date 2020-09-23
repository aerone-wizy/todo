import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import {
  selectCurrentUser,
  selectIsAthenticated,
} from "../redux/user/user.selector";
import { signInStart } from "../redux/user/user.actions";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { LinearProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formCard: {
    width: "20rem",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  content: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Login = ({ signInStart, currentUser, isAuthenticated }) => {
  const classes = useStyles();
  const [userCredentials, setUserCredentials] = useState({
    username: "",
    password: "",
  });
  const { username, password } = userCredentials;

  const handleLogin = async (event) => {
    event.preventDefault();
    console.log("handleLogin() userCredentials:", userCredentials);
    signInStart(username, password);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserCredentials({ ...userCredentials, [name]: value });
  };

  return !isAuthenticated ? (
    <LinearProgress />
  ) : currentUser ? (
    <Redirect to="/" />
  ) : (
    <Card className={classes.formCard}>
      <CardHeader title="Log In"></CardHeader>
      <CardContent>
        {
          //* TODO:  onSubmit={handleLogin}
        }
        <form onSubmit={handleLogin} className={classes.content}>
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            type="text"
            value={username}
            onChange={handleChange}
            autoComplete="on"
            size="small"
          />
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={password}
            onChange={handleChange}
            autoComplete="on"
            size="small"
          />

          <Button variant="contained" color="primary" type="submit">
            Log in
          </Button>
          <hr />
          <p>Don't have an account?</p>
          <Button variant="contained" component={Link} to="/signup">
            Create new account
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isAuthenticated: selectIsAthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  signInStart: (username, password) =>
    dispatch(signInStart({ username, password })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
