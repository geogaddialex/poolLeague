import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isEmpty } from "../Utils"

export default function AuthenticatedRoute({ component: C, appProps, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        !isEmpty(appProps.user)
          ? <C {...props} {...appProps} />
          : <Redirect
              to={`/login?redirect=${props.location.pathname}${props.location
                .search}`}
            />}
    />
  );
}