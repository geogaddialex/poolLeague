import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty, formatDateAndTime } from "../Utils"
import "./LatestResults.css";

export default function LatestResults(props) {

  function compareCreatedAt(a,b){
    return new Date(b.createdAt) - new Date(a.createdAt);
  }

  return (

    <div className="LatestResults">
      <Table striped bordered condensed hover>

        <thead>
          <tr>
            <th>Date</th>
            <th>Winner</th>
            <th>Loser</th>
            <th>Special</th>
            <th>Excuses</th>
          </tr>
        </thead>

        <tbody>
        {
          props.games
          .sort(compareCreatedAt)
          .slice(0, props.limit)
          .map((result, index) => {
            return (
              <tr key={result.winner._id + result.loser._id + result.createdAt}>
                <td>{formatDateAndTime(result.createdAt)}</td>
                <td>{result.winner.name}</td>
                <td>{result.loser.name}</td>
                <td>{result.special}</td>
                <td>{result.excuses}</td>
              </tr>
            )
          })
        }
        </tbody>
      
      </Table>
    </div>

  );
}