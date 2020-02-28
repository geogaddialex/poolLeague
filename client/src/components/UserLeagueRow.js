import React, { useState, useEffect } from "react";
import * as Utils from "../Utils/Utils";
import { getMinGames, getGamesForSeason } from "../Utils/SeasonUtils";
import { getGamesForUser, getUser, countWins, countLosses, countPlayed, countSevenBallsFor,
  countSevenBallsAgainst, countFoulsFor, countFoulsAgainst, calculateOldPoints, calculateTNSR, countUnderMin,
  countUnplayed, countPenalty, getPosition } from "../Utils/UserUtils"
import { Table, Tooltip, OverlayTrigger, Alert } from "react-bootstrap";
import "./UserLeagueRow.css";

export default function UserLeagueRow(props) {

  function calculateWinsToFirst(subjectPlayer){

    const seasonGames = getGamesForSeason(props.games, props.season)
    const TNSRS = props.season.players.map( user => {
      const TNSR = calculateTNSR(seasonGames, user, props.season)
      return TNSR
    })

    let max = props.season.players.find(player => calculateTNSR(seasonGames, player, props.season) == Math.max( ...TNSRS ) )
    let TNSRdiff = calculateTNSR(seasonGames, max, props.season) - calculateTNSR(seasonGames, subjectPlayer, props.season) + 0.01
    let losses = countLosses(props.games, subjectPlayer) > 0 ? countLosses(props.games, subjectPlayer) : 1
    let penalty = countPenalty(props.games, subjectPlayer, props.season)

    return max === subjectPlayer ? 0 : Math.ceil(TNSRdiff * (losses+countPenalty(props.games, subjectPlayer, props.season)))
  }

  function calculateWinsToRankUp(user){
    let index = props.season.players.sort(compareTNSR).indexOf(user)

    if(index === 0 ){
      return 0
    }else{
      let upOne = props.season.players[index-1]
      let TNSRdiff = calculateTNSR(upOne) - calculateTNSR(user) + 0.01
      let losses = countLosses(user) > 0 ? countLosses(user) : 1
      return Math.ceil(TNSRdiff * (losses+countPenalty(user)))
    }
    
  }

  function compareTNSR(a, b) {
    return calculateTNSR(b) - calculateTNSR(a);
  }

  function compareTNSRthenWinsToFirst(a, b) {

    if (calculateTNSR(a) > calculateTNSR(b)) return -1;
    if (calculateTNSR(a) < calculateTNSR(b)) return 1;

    if (countLosses(a) > countLosses(b)) return 1;
    if (countLosses(a) < countLosses(b)) return -1;
  }

  const TooltipSevenBall = (
    <Tooltip id="TooltipSevenBall">
      <strong>Seven Ball Wins</strong>
      <br/>Yours / Opponents
    </Tooltip>
  );


  const TooltipFoul = (
    <Tooltip id="TooltipFoul">
      <strong>Foul Wins</strong>
      <br/>Opponent fouled / You fouled
    </Tooltip>
  );

  const TooltipPenalty = (
    <Tooltip id="TooltipPenalty">
      <strong>+1 Unplayed Games Penalty</strong>
      <br/>Each unplayed opponent
      <br/>Each game under minimum
    </Tooltip>
  );

  const TooltipPoints = (
    <Tooltip id="TooltipPoints">
      <strong>+1</strong> win<br/>
      <strong>+2</strong> seven ball<br/>
      <strong>-0.5</strong> foul win
    </Tooltip>
  );

  const TooltipTNSR = (
    <Tooltip id="TooltipTNSR">
      <strong>TNSRating</strong>
      <br/>Points ÷ ( Losses + Penalty )
    </Tooltip>
  );

  const TooltipWinsToFirst = (
    <Tooltip id="TooltipWinsToFirst">
      Wins needed for first place
    </Tooltip>
  );

  const TooltipWinsToNext = (
    <Tooltip id="TooltipWinsToNext">
      Wins needed to rank up
    </Tooltip>
  );


  return (

    <div className="UserLeagueRow">

    { !Utils.isEmpty(props.season.players) &&
        <Table striped bordered condensed hover responsive>

          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Played</th>
              <th>Wins</th>
              <th>Losses</th>
              <OverlayTrigger placement="top" overlay={TooltipSevenBall}>
                <th>7Balls</th>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={TooltipFoul}>
                <th>Fouls</th>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={TooltipPoints}>
                <th>Points</th>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={TooltipPenalty}>
                <th>Penalty</th>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={TooltipTNSR}>
                <th>TNSR</th>
              </OverlayTrigger>
              <OverlayTrigger placement="top" overlay={TooltipWinsToFirst}>
                <th>#1</th>
              </OverlayTrigger>
            </tr>
          </thead>

          <tbody>

          { props.games.length > 0 &&
                <tr>
                  <td>{getPosition(props.player, props.season, props.games)}</td>
                  <td><b><a href={`/user/${props.player._id}`}>{props.player.name}</a></b></td>
                  <td>{countPlayed(props.games, props.player)}</td>
                  <td>{countWins(props.games, props.player)}</td>
                  <td>{countLosses(props.games, props.player)}</td>
                  <td>{countSevenBallsFor(props.games, props.player)} / {countSevenBallsAgainst(props.games, props.player)}</td>
                  <td>{countFoulsFor(props.games, props.player)} / {countFoulsAgainst(props.games, props.player)}</td>
                  <td>{calculateOldPoints(props.games, props.player)}</td>
                  <td>{countPenalty(props.games, props.player, props.season)}</td>
                  <td><b>{Utils.dp(calculateTNSR(props.games, props.player, props.season))}</b></td>
                  <td>{calculateWinsToFirst(props.player)}</td>
                </tr>
          }
          </tbody>
        </Table>
      }
    </div>

  );
}