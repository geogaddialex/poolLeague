import React, { useState, useEffect } from "react";
import { Table, Tooltip, OverlayTrigger, Alert, Glyphicon } from "react-bootstrap";
import * as Utils from "../Utils/Utils";
import * as SeasonUtils from "../Utils/SeasonUtils";
import * as UserUtils from "../Utils/UserUtils"
import "./LeagueTable.css";

export default function LeagueTable(props) {

  const [sortedPlayers, setSortedPlayers] = useState([]);

  useEffect(() => {
    
    setSortedPlayers(UserUtils.playersSortedByTNSR([...props.games, ...props.runTheNumbers], props.season))

  }, [props.season.players, props.runTheNumbers])

  const TooltipSevenBall = (
    <Tooltip id="TooltipSevenBall">
      <strong>Seven Ball Wins</strong>
      <br/>Yours / Opponents
    </Tooltip>
  );

  const TooltipFoul = (
    <Tooltip id="TooltipFoul">
      <strong>Foul Wins</strong>
      <br/>You won / Opponent won
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
      <br/>Diminished wins ÷ <br/>( Diminished losses + Penalty )
    </Tooltip>
  );

  const TooltipWinsToFirst = (
    <Tooltip id="TooltipWinsToFirst">
      <strong>Wins needed for first place</strong>
      <br/>Least beaten opponent -<br/> Farming one person
    </Tooltip>
  );

  const TooltipWinsToNext = (
    <Tooltip id="TooltipWinsToNext">
      <strong>Wins needed to rank up</strong>
      <br/>Least beaten opponent -<br/> Farming one person
    </Tooltip>
  );

  return (

    <div className="LeagueTable">

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
              <OverlayTrigger placement="top" overlay={TooltipPenalty}>
                <th>Penalty</th>
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
            sortedPlayers.map((user, index) => {
              return (
                <tr key={index} style={ user._id == props.user._id ? UserUtils.myRow : null} >
                  <td>{index+1}</td>
                  <td><b><a href={`/user/${user._id}`}>{user.name} </a></b></td>
                  <td>{UserUtils.countPlayed([...props.games, ...props.runTheNumbers], user)}</td>
                  <td>{UserUtils.countWins([...props.games, ...props.runTheNumbers], user)}</td>
                  <td>{UserUtils.countLosses([...props.games, ...props.runTheNumbers], user)}</td>
                  <td>{UserUtils.countSevenBallsFor([...props.games, ...props.runTheNumbers], user)} / {UserUtils.countSevenBallsAgainst([...props.games, ...props.runTheNumbers], user)}</td>
                  <td>{UserUtils.countFoulsFor([...props.games, ...props.runTheNumbers], user)} / {UserUtils.countFoulsAgainst([...props.games, ...props.runTheNumbers], user)}</td>
                  <td>{UserUtils.countPenalty([...props.games, ...props.runTheNumbers], user, props.season)}</td>
                  <td><b>{Utils.dp(UserUtils.calculateTNSR([...props.games, ...props.runTheNumbers], user, props.season))}</b></td>
                  <td>{UserUtils.calculateWinsToFirst([...props.games, ...props.runTheNumbers], user, props.season, sortedPlayers)}</td>
                  <td>{UserUtils.calculateWinsToRankUp([...props.games, ...props.runTheNumbers], user, props.season, sortedPlayers)}</td>
                </tr>
              )
            })
          }

          { props.games.length == 0 &&
            props.season.players.map((user, index) => {
              return (
                <tr key={index} style={ user._id == props.user._id ? UserUtils.myRow : null}>
                  <td>{index+1}</td>
                  <td><b><a href={`/user/${user._id}`}>{user.name} </a></b></td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0 / 0</td>
                  <td>0 / 0</td>
                  <td>{props.season.players.length-1 + SeasonUtils.getMinGames(props.season)}</td>
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
        Utils.isEmpty(props.season.players) &&
          <Alert bsStyle="info">
            No players have entered the season
          </Alert>
      }
    </div>

  );
}