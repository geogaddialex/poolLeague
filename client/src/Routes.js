import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./components/AppliedRoute";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import AdminRoute from "./components/AdminRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import User from "./containers/User";
import Settings from "./containers/Settings";
import Admin from "./containers/Admin";
import NotFound from "./containers/NotFound";
import All from "./containers/All";
import AllGames from "./containers/AllGames";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />
      <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />
      <AdminRoute path="/admin" exact component={Admin} appProps={appProps} />
      <AppliedRoute path="/user/:userId" exact component={User} appProps={appProps} />
      <AppliedRoute path="/all" exact component={All} appProps={appProps} />
      <AdminRoute path="/games" exact component={AllGames} appProps={appProps} />

      <Route component={NotFound} />
    </Switch>
  );
}