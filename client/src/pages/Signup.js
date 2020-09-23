import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link, Redirect } from "react-router-dom";

import {
  selectCurrentUser,
  selectIsAthenticated,
} from "../redux/user/user.selector";
import { signUpStart } from "../redux/user/user.actions";

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

const Signup = ({ currentUser, signUpStart, isAuthenticated }) => {
  const classes = useStyles();
  const [userCredentials, setUserCredentials] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, username, email, password, confirmPassword } = userCredentials;

  const handleSignup = async (event) => {
    event.preventDefault();
    signUpStart(userCredentials);
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
      <CardHeader title="Sign up"></CardHeader>
      <CardContent>
        <form onSubmit={handleSignup} className={classes.content}>
          <TextField
            label="Name"
            variant="outlined"
            name="name"
            type="text"
            autoComplete="on"
            value={name}
            onChange={handleChange}
            size="small"
          />
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
            label="Email address"
            variant="outlined"
            name="email"
            type="email"
            value={email}
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
          <TextField
            label="Confirm Password"
            variant="outlined"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleChange}
            autoComplete="on"
            size="small"
          />
          <Button variant="contained" color="primary" type="submit">
            Sign up
          </Button>
          <hr />
          <p>Already have an account?</p>
          <Button variant="contained" component={Link} to="/login">
            Login your account
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
  signUpStart: (userCredential) => dispatch(signUpStart(userCredential)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
