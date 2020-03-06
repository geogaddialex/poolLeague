import React, { useState, useEffect } from "react";
import { Table, Alert } from "react-bootstrap";
import * as Utils from "../Utils/Utils";
import * as UserUtils from "../Utils/UserUtils"
import JoinSeason from "../components/JoinSeason";
import "./UserStats.css";

export default function UserStats(props) {

  return (

    <div className="UserStats">

        <>
          <p><b>{UserUtils.getName(props.player, props.users)}</b></p>

          { !Utils.isEmpty(props.games) ?

            <>
              <p>Total Games: { props.games.length }</p>
              <p>Best TNSR: { Utils.dp(UserUtils.getBestTNSR(props.player, props.games, props.seasons, props.users)) }</p>
              <p>Overall TNSR: { Utils.dp(UserUtils.calculateAllTimeTNSR(props.games, props.player, props.users)) }</p>
            </>

            :

            <Alert bsStyle="info">No games played</Alert>
          }
          
        </>

    </div>

  );
}