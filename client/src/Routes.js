import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./routes/AppliedRoute";
import AuthenticatedRoute from "./routes/AuthenticatedRoute";
import UnauthenticatedRoute from "./routes/UnauthenticatedRoute";
import AdminRoute from "./routes/AdminRoute";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import User from "./containers/User";
import Settings from "./containers/Settings";
import Admin from "./containers/Admin";
import NotFound from "./containers/NotFound";
import All from "./containers/All";
import Games from "./containers/Games";
import Rules from "./containers/Rules";
import Users from "./containers/Users";

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} /> 
      <AppliedRoute path="/user/:userId" exact component={User} appProps={appProps} />
      <AppliedRoute path="/all" exact component={All} appProps={appProps} />
      <AppliedRoute path="/rules" exact component={Rules} appProps={appProps} />

      <UnauthenticatedRoute path="/login" exact component={Login} appProps={appProps} />
      <UnauthenticatedRoute path="/signup" exact component={Signup} appProps={appProps} />

      <AuthenticatedRoute path="/settings" exact component={Settings} appProps={appProps} />

      <AdminRoute path="/admin" exact component={Admin} appProps={appProps} />
      <AdminRoute path="/games" exact component={Games} appProps={appProps} />
      <AdminRoute path="/users" exact component={Users} appProps={appProps} />

      <Route component={NotFound} />
    </Switch>
  );
}