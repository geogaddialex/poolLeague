import React, { useState, useEffect } from "react";
import { getMinGames, isEmpty, myRow, getGamesForSeason } from "../Utils";
import { getGamesForUser, getUser, countWins, countLosses, countPlayed, countSevenBallsFor,
  countSevenBallsAgainst, countFoulsFor, countFoulsAgainst, calculatePoints, calculateTNSR, countUnderMin,
  countUnplayed, countPenalty } from "../UserUtils"
import { Table, Tooltip, OverlayTrigger, Alert } from "react-bootstrap";
import "./UserLeagueRow.css";

export default function UserLeagueRow(props) {

  const player = getUser(props.player, props.users)

  function getRTNForUser(user){
    return props.runTheNumbers.filter(game => game.winner == user._id || game.loser == user._id)
  }

  function calculateWinsToFirst(subjectPlayer, players, games, season){

    const seasonGames = getGamesForSeason(games, season)

    const TNSRS = players.map( user => {
      const TNSR = calculateTNSR(seasonGames, user, season)
      return TNSR
    })

    let max = props.season.players.find(player => calculateTNSR(seasonGames, player, season) == Math.max( ...TNSRS ) )

    let TNSRdiff = calculateTNSR(seasonGames, max, season) - calculateTNSR(seasonGames, subjectPlayer, season) + 0.01
    let losses = countLosses(games, subjectPlayer) > 0 ? countLosses(games, subjectPlayer) : 1
    let penalty = countPenalty(games, subjectPlayer, season)

    return max === subjectPlayer ? 0 : Math.ceil(TNSRdiff * (losses+countPenalty(games, subjectPlayer, season)))
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
      <br/>Yours / Opponents
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

    { !isEmpty(props.season.players) &&
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
                  <td>?</td>
                  <td><b><a href={`/user/${player._id}`}>{player.name}</a></b></td>
                  <td>{countPlayed(props.games, player)}</td>
                  <td>{countWins(props.games, player)}</td>
                  <td>{countLosses(props.games, player)}</td>
                  <td>{countSevenBallsFor(props.games, player)} / {countSevenBallsAgainst(props.games, player)}</td>
                  <td>{countFoulsFor(props.games, player)} / {countFoulsAgainst(props.games, player)}</td>
                  <td>{calculatePoints(props.games, player)}</td>
                  <td>{countPenalty(props.games, player, props.season)}</td>
                  <td><b>{Math.round(calculateTNSR(props.games, player, props.season) * 100) / 100}</b></td>
                  <td>{calculateWinsToFirst(player, props.season.players, props.games, props.season)}</td>
                </tr>
          }
          </tbody>
        </Table>
      }
    </div>

  );
}