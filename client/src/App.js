import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import DrawerNav from "./DrawerNav";

import { checkUserSession } from "./redux/user/user.actions";

function App({ checkUserSession }) {
  useEffect(() => {
    // console.log("didMount");
    checkUserSession();
  }, [checkUserSession]);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={DrawerNav} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
});

export default connect(null, mapDispatchToProps)(App);
