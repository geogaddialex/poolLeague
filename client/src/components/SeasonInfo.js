import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getMinGames, isEmpty, formatDate, isSeasonOpen } from "../Utils";
import JoinSeason from "../components/JoinSeason";
import "./SeasonInfo.css";

export default function SeasonInfo(props) {

  function userInSeason(){
    return props.season.players.some(player => player._id == props.user._id)
  }

  return (

    <div className="SeasonInfo">

        <>
          <p><b>{props.season.name}</b></p>
          <p>Start: {formatDate(props.season.start)}</p>
          <p>End: {formatDate(props.season.end)}</p>

          { !isEmpty(props.season.players) &&
            <>
              <p>Total Games: { props.games.length }</p>
              <p>Min Games: {getMinGames(props.season)}</p>
            </>
          }
          
        </>

      { !isEmpty(props.user) && !userInSeason(props.user) && isSeasonOpen(props.season) &&
        <JoinSeason block type="submit" bsSize="large" user={props.user} season={props.season}>Join</JoinSeason>
      }
     
    </div>

  );
}