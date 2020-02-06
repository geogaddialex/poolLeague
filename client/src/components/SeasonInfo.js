import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty, formatDate } from "../Utils/Utils";
import { getMinGames, isSeasonOpen, canJoinSeason } from "../Utils/SeasonUtils";
import { userInSeason } from "../Utils/UserUtils";
import JoinSeason from "../components/JoinSeason";
import "./SeasonInfo.css";

export default function SeasonInfo(props) {

  return (

    <div className="SeasonInfo">

        <>
          <p><b>{props.season.name}</b></p>
          <p>{formatDate(props.season.start)} - {formatDate(props.season.end)}</p>

          { !isEmpty(props.season.players) &&
            <>
              <p>Total Games: { props.games.length }</p>
              <p>Min Games: {getMinGames(props.season)}</p>
            </>
          }
          
        </>

      { !isEmpty(props.user) && !userInSeason(props.season, props.user._id) && canJoinSeason(props.season) && 
        <JoinSeason block type="submit" bsSize="large" user={props.user} season={props.season}>Join</JoinSeason>
      }

    </div>

  );
}