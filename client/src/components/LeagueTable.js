import React from "react";
import { Table } from "react-bootstrap";
import "./LeagueTable.css";

export default function LeagueTable({
  className = "",
  ...props
}) {
  return (

    <Table
      className={`LeagueTable ${className}`}
      {...props}
    />

  );
}