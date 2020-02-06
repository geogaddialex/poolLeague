import React, { useState, useEffect } from "react";
import { Table, Alert } from "react-bootstrap";
import { isEmpty } from "../Utils/Utils";
import { getBestTNSR, getName, calculateAllTimeTNSR } from "../Utils/UserUtils"
import JoinSeason from "../components/JoinSeason";
import "./UserStats.css";

export default function UserStats(props) {

  return (

    <div className="UserStats">

        <>
          <p><b>{getName(props.player, props.users)}</b></p>

          { !isEmpty(props.games) ?

            <>
              <p>Total Games: { props.games.length }</p>
              <p>Best TNSR: { getBestTNSR(props.player, props.games, props.seasons, props.users) }</p>
              <p>Overall TNSR: { calculateAllTimeTNSR(props.games, props.player, props.users) }</p>
            </>

            :

            <Alert bsStyle="info">No games played</Alert>
          }
          
        </>

    </div>

  );
}