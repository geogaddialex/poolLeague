import React, { useState, useEffect } from "react";
import { getMinGames, isEmpty } from "../Utils";
import { Table } from "react-bootstrap";
import "./LeagueTable.css";

export default function LeagueTable(props) {

  function countWins(user){
    const realWins = props.games.filter(x => x.winner._id === user._id).length
    const rtnWins = props.runTheNumbers.filter(x => x.winner._id === user._id).length
    return realWins + rtnWins
  }

  function countLosses(user){
    const realLosses = props.games.filter(x => x.loser._id === user._id).length
    const rtnLosses = props.runTheNumbers.filter(x => x.loser._id === user._id).length
    return realLosses + rtnLosses
  }

  function countPlayed(user){
    const realPlayed = props.games.filter(x => x.winner._id === user._id || x.loser._id === user._id).length
    const rtnPlayed = props.runTheNumbers.filter(x => x.winner._id === user._id || x.loser._id === user._id).length
    return realPlayed + rtnPlayed
  }

  function countSevenBallsFor(user){
    const realSevenBallsFor = props.games.filter(game => game.winner._id === user._id && game.special === "7 Ball").length
    const rtnSevenBallsFor = props.runTheNumbers.filter(game => game.winner._id === user._id && game.special === "7 Ball").length
    return realSevenBallsFor + rtnSevenBallsFor
  }

  function countSevenBallsAgainst(user){
    const realSevenBallsAgainst = props.games.filter(game => game.loser._id === user._id && game.special === "7 Ball").length
    const rtnSevenBallsAgainst = props.runTheNumbers.filter(game => game.loser._id === user._id && game.special === "7 Ball").length
    return realSevenBallsAgainst + rtnSevenBallsAgainst
  }

  function countFoulsFor(user){
    const realFoulsFor = props.games.filter(x => x.winner._id === user._id && x.special === "Foul Win").length
    const rtnFoulsFor = props.runTheNumbers.filter(x => x.winner._id === user._id && x.special === "Foul Win").length
    return realFoulsFor + rtnFoulsFor
  }

  function countFoulsAgainst(user){
    const realFoulsAgainst = props.games.filter(x => x.loser._id === user._id && x.special === "Foul Win").length
    const rtnFoulsAgainst = props.runTheNumbers.filter(x => x.loser._id === user._id && x.special === "Foul Win").length

    return realFoulsAgainst + rtnFoulsAgainst
  }

  function calculatePoints(user){
    return countWins(user) + countSevenBallsFor(user)*2 - countFoulsFor(user)*0.5
  }

  function calculateTNSR(user){
    let losses = countLosses(user) > 0 ? countLosses(user) : 1
    return calculatePoints(user) / (losses + countPenalty(user) )
  }

  function countUnderMin(user){
    return countPlayed(user) < getMinGames(props.season) ? getMinGames(props.season) - countPlayed(user) : 0
  }

  function countUnplayed(user){
    const unique = []

    getGamesForUser(user).forEach((game) => {
      if(game.winner._id == user._id && !unique.some(opponent => opponent._id == game.loser._id) ){
        unique.push(game.loser)
      }else if (game.loser._id == user._id && !unique.some(opponent => opponent._id == game.winner._id) ){
        unique.push(game.winner)
      }
    })

    return props.season.players.length - unique.length - 1
  }

  function countPenalty(user){
    return countUnderMin(user) + countUnplayed(user)
  }

  function getGamesForUser(user){
    return props.games.filter(game => game.winner._id == user._id || game.loser._id == user._id)
  }

  function calculateWinsToFirst(user){
    let max = props.season.players.sort(compareTNSR)[0]
    let TNSRdiff = calculateTNSR(max) - calculateTNSR(user) + 0.01
    let losses = countLosses(user) > 0 ? countLosses(user) : 1
    let penalty = countPenalty(user)

    return max === user ? 0 : Math.ceil(TNSRdiff * (losses+countPenalty(user)))
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

    if (calculateWinsToFirst(a) > calculateWinsToFirst(b)) return 1;
    if (calculateWinsToFirst(a) < calculateWinsToFirst(b)) return -1;
  }

  return (

    <div className="LeagueTable">

    { !isEmpty(props.season.players) &&
        <Table striped bordered condensed hover responsive>

          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Played</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>7Balls</th>
              <th>Fouls</th>
              <th>Points</th>
              <th>Penalty</th>
              <th>TNSR</th>
              <th>#1</th>
              <th>+1</th>
            </tr>
          </thead>

          <tbody>

          { props.games.length > 0 &&
            props.season.players.sort(compareTNSRthenWinsToFirst).map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>{countPlayed(user)}</td>
                  <td>{countWins(user)}</td>
                  <td>{countLosses(user)}</td>
                  <td>{countSevenBallsFor(user)} / {countSevenBallsAgainst(user)}</td>
                  <td>{countFoulsFor(user)} / {countFoulsAgainst(user)}</td>
                  <td>{calculatePoints(user)}</td>
                  <td>{countPenalty(user)}</td>
                  <td>{Math.round(calculateTNSR(user) * 100) / 100}</td>
                  <td>{calculateWinsToFirst(user)}</td>
                  <td>{calculateWinsToRankUp(user)}</td>
                </tr>
              )
            })
          }

          { props.games.length == 0 &&
            props.season.players.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0 / 0</td>
                  <td>0 / 0</td>
                  <td>0</td>
                  <td>{props.season.players.length-1 + getMinGames(props.season)}</td>
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
        isEmpty(props.season.players) &&
          <p>No players have entered the season</p>
      }
    </div>

  );
}