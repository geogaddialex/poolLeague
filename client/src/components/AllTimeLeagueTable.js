import React, { useState, useEffect } from "react";
import { isEmpty, myRow } from "../Utils";
import { Table, Tooltip, OverlayTrigger } from "react-bootstrap";
import "./AllTimeLeagueTable.css";

export default function AllTimeLeagueTable(props) {

  function countWins(user){
    return props.games.filter(x => x.winner._id === user._id).length
  }

  function countLosses(user){
    return props.games.filter(x => x.loser._id === user._id).length
  }

  function countPlayed(user){
    return props.games.filter(x => x.winner._id === user._id || x.loser._id === user._id).length
  }

  function countSevenBallsFor(user){
    return props.games.filter(game => game.winner._id === user._id && game.special === "7 Ball").length
  }

  function countSevenBallsAgainst(user){
    return props.games.filter(game => game.loser._id === user._id && game.special === "7 Ball").length
  }

  function countFoulsFor(user){
    return props.games.filter(x => x.winner._id === user._id && x.special === "Foul Win").length
  }

  function countFoulsAgainst(user){
    return props.games.filter(x => x.loser._id === user._id && x.special === "Foul Win").length
  }

  function calculatePoints(user){
    return countWins(user) + countSevenBallsFor(user)*2 - countFoulsFor(user)*0.5
  }

  function calculateTNSR(user){
    let losses = countLosses(user) > 0 ? countLosses(user) : 1
    return calculatePoints(user) / losses
  }

  function getGamesForUser(user){
    return props.games.filter(game => game.winner._id == user._id || game.loser._id == user._id)
  }

  function calculateWinsToFirst(user){
    let max = props.players.sort(compareTNSR)[0]
    let TNSRdiff = calculateTNSR(max) - calculateTNSR(user) + 0.01
    let losses = countLosses(user) > 0 ? countLosses(user) : 1

    return max === user ? 0 : Math.ceil(TNSRdiff * losses)
  }

  function calculateWinsToRankUp(user){
    let index = props.players.sort(compareTNSR).indexOf(user)

    if(index === 0 ){
      return 0
    }else{
      let upOne = props.players[index-1]
      let TNSRdiff = calculateTNSR(upOne) - calculateTNSR(user) + 0.01
      let losses = countLosses(user) > 0 ? countLosses(user) : 1
      return Math.ceil(TNSRdiff * losses)
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
      <br/>Yours / Opponents
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

    <div className="AllTimeLeagueTable">

    { !isEmpty(props.players) &&
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
              <OverlayTrigger placement="top" overlay={TooltipWinsToNext}>
                <th>+1</th>
              </OverlayTrigger>
            </tr>
          </thead>

          <tbody>

          { props.games.length > 0 &&
            props.players.sort(compareTNSRthenWinsToFirst).filter(player => countPlayed(player) > 0).map((user, index) => {
              return (
                <tr key={index} style={ user._id == props.user._id ? myRow : null} >
                  <td>{index+1}</td>
                  <td><b><a href={`/user/${user._id}`}>{user.name}</a></b></td>
                  <td>{countPlayed(user)}</td>
                  <td>{countWins(user)}</td>
                  <td>{countLosses(user)}</td>
                  <td>{countSevenBallsFor(user)} / {countSevenBallsAgainst(user)}</td>
                  <td>{countFoulsFor(user)} / {countFoulsAgainst(user)}</td>
                  <td>{calculatePoints(user)}</td>
                  <td><b>{Math.round(calculateTNSR(user) * 100) / 100}</b></td>
                  <td>{calculateWinsToFirst(user)}</td>
                  <td>{calculateWinsToRankUp(user)}</td>
                </tr>
              )
            })
          }

          { props.games.length == 0 &&
            props.players.map((user, index) => {
              return (
                <tr key={index} style={ user._id == props.user._id ? myRow : null}>
                  <td>{index+1}</td>
                  <td><b>{user.name}</b></td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0 / 0</td>
                  <td>0 / 0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              )
            })
          }

          </tbody>
        </Table>
      }

      {
        isEmpty(props.players) &&
          <p>No players exist</p>
      }
    </div>

  );
}