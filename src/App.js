import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./PrivateRoute";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute component={Home} exact path="/" />
          <Route component={SignIn} path="/signin" />
          <Route component={SignUp} path="/signup" />
          <Route component={ForgotPassword} path="/forgot-password" />
        </Switch>
      </AuthProvider>
    </Router>
  );
};

export default App;
