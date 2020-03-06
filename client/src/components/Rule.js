import React from "react";
import "./Rule.css";
import {Alert} from "react-bootstrap"

export default function Rule(props) {
  return (
    <span className="Rule">
      <Alert bsStyle="info">{props.rule}</Alert>
    </span>
  );
}