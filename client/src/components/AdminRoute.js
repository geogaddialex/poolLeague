import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isEmpty } from "../Utils"

export default function AdminRoute({ component: C, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        appProps.user.isAdmin
          ? <C {...props} {...appProps} />
          : <Redirect
              to={`/`}
            />}
    />
  );
}