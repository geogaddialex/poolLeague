import React, { useState, useEffect } from "react";
import * as Utils from "../Utils/Utils";
import * as UserUtils from "../Utils/UserUtils"
import { Table, Tooltip, OverlayTrigger, Alert } from "react-bootstrap";
import "./AllTimeUserLeagueRow.css";

export default function AllTimeUserLeagueRow(props) {

  function calculateTNSR(user){
    let losses = countLosses(props.games, user) > 0 ? countLosses(props.games, user) : 1
    return calculateOldPoints(props.games, user) / losses
  }

  function getPosition(player){
    const TNSRS = props.users.map( user => calculateTNSR(user))
    .sort(function(a, b){return b-a})

    const positon = TNSRS.findIndex(value => value == calculateTNSR(player))
    return positon+1
}

  function calculateWinsToFirst(subjectPlayer){

    const TNSRS = props.users.map( user => {
      return calculateTNSR(user)
    })

    let max = props.users.find(currentPlayer => calculateTNSR(currentPlayer) == Math.max( ...TNSRS ) )
    let TNSRdiff = calculateTNSR(max) - calculateTNSR(subjectPlayer) + 0.01
    let losses = countLosses(props.games, subjectPlayer) > 0 ? countLosses(props.games, subjectPlayer) : 1

    return max === subjectPlayer ? 0 : Math.ceil(TNSRdiff * losses)
  }

  function calculateWinsToRankUp(user){
    let index = props.users.sort(compareTNSR).indexOf(user)

    if(index === 0 ){
      return 0
    }else{
      let upOne = props.users[index-1]
      let TNSRdiff = calculateTNSR(upOne) - calculateTNSR(user) + 0.01
      let losses = countLosses(user) > 0 ? countLosses(user) : 1
      return Math.ceil(TNSRdiff * (losses+UserUtils.countPenalty(user)))
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
      <br/>Points ÷ Losses 
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

    { !Utils.isEmpty(props.users) &&
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
                  <td>{getPosition(props.player)}</td>
                  <td><b><a href={`/user/${props.player._id}`}>{props.player.name}</a></b></td>
                  <td>{UserUtils.countPlayed(props.games, props.player)}</td>
                  <td>{UserUtils.countWins(props.games, props.player)}</td>
                  <td>{UserUtils.countLosses(props.games, props.player)}</td>
                  <td>{UserUtils.countSevenBallsFor(props.games, props.player)} / {UserUtils.countSevenBallsAgainst(props.games, props.player)}</td>
                  <td>{UserUtils.countFoulsFor(props.games, props.player)} / {UserUtils.countFoulsAgainst(props.games, props.player)}</td>
                  <td>{UserUtils.calculateOldPoints(props.games, props.player)}</td>
                  <td><b>{Utils.dp(calculateTNSR(props.player))}</b></td>
                  <td>{calculateWinsToFirst(props.player)}</td>
                </tr>
          }
          </tbody>
        </Table>
      }
    </div>

  );
}