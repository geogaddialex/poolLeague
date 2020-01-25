import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty } from "../Utils"
import "./LatestResults.css";

export default function LatestResults(props) {

  const numberOfResults = 5;

  function getName(userId){
    return props.season.players.find(user => user._id == userId).name
  }

  function compareCreatedAt(a,b){
    return b.createdAt > a.createdAt;
  }

  return (

    <div className="LatestResults">

      {!isEmpty(props.season.players) && 

        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Winner</th>
              <th>Loser</th>
              <th>Special</th>
            </tr>
          </thead>

          <tbody>
          {
            props.games.sort(compareCreatedAt).slice(0, numberOfResults).map((result, index) => {
              return (
                <tr key={result.winner + result.loser + result.createdAt}>
                  <td>{getName(result.winner)}</td>
                  <td>{getName(result.loser)}</td>
                  <td>{result.special}</td>
                </tr>
              )
            })
          }
          </tbody>
        
        </Table>
      }
    </div>

  );
}