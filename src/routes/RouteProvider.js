import React from "react";
import { Switch, Route } from "react-router-dom";

//Pages

import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PrivateRoute from "../PrivateRoute";
import Home from "../pages/Home";
import ForgotPassword from "../pages/ForgotPassword";
import PasswordReset from "../pages/PasswordRest";

// Route Names
import {
  signUpRoute,
  signInRoute,
  passwordResetRoute,
  forgotPasswordRoute,
} from "./routeNames";

const RouteProvider = () => {
  return (
    <Switch>
      <PrivateRoute component={Home} exact path="/" />
      <Route component={SignIn} path={signInRoute} />
      <Route component={SignUp} path={signUpRoute} />
      <Route component={ForgotPassword} path={forgotPasswordRoute} />
      <Route component={PasswordReset} path={passwordResetRoute} />
    </Switch>
  );
};

export default RouteProvider;
