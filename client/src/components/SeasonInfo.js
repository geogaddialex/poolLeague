import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import * as Utils from "../Utils/Utils";
import * as SeasonUtils from "../Utils/SeasonUtils";
import * as UserUtils from "../Utils/UserUtils";
import JoinSeason from "../components/JoinSeason";
import "./SeasonInfo.css";

export default function SeasonInfo(props) {

  return (

    <div className="SeasonInfo">

        <>
          <p><b>{props.season.name}</b></p>
          <p>{Utils.formatDate(props.season.start)} - {Utils.formatDate(props.season.end)}</p>

          { !Utils.isEmpty(props.season.players) &&
            <>
              <p>Total Games: { props.games.length }</p>
              <p>Min Games: {SeasonUtils.getMinGames(props.season)}</p>
            </>
          }
          
        </>

      { !Utils.isEmpty(props.user) && !UserUtils.userInSeason(props.season, props.user._id) && SeasonUtils.canJoinSeason(props.season) && 
        <JoinSeason block type="submit" bsSize="large" user={props.user} season={props.season}>Join</JoinSeason>
      }
    </div>

  );
}