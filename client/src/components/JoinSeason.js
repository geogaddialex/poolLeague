import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "./JoinSeason.css";

export default function JoinSeason({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <Button
      className={`JoinSeason ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
      {props.children}
    </Button>
  );
}