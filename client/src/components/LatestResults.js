import React, { useState, useEffect } from "react";
import { Table, Button, Glyphicon } from "react-bootstrap";
import { isEmpty, formatDateAndTime, userPlayed, myRow } from "../Utils"
import Excuses from "./Excuses"
import "./LatestResults.css";

export default function LatestResults(props) {

  function compareCreatedAt(a,b){
    return new Date(b.createdAt) - new Date(a.createdAt);
  }

  return (

    <div className="LatestResults">
      <p><b>Latest Results</b></p>
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
          .map((game, index) => {
            return (
              <tr key={game._id} style={ userPlayed(game, props.user) ? myRow : null}>
                <td>{formatDateAndTime(game.createdAt)}</td>
                <td>{game.winner.name}</td>
                <td>{game.loser.name}</td>
                <td>{game.special}</td>
                <td><Excuses game={game} user={props.user}/></td>
              </tr>
            )
          })
        }
        </tbody>
      
      </Table>
    </div>

  );
}