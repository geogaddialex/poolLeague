import React from "react";
import "./Excuse.css";

export default function Excuse(props) {

  return (
    <span className="Excuse">
      <b>{props.name}</b>: {props.comment}
    </span>
  );
}