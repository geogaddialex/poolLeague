import React, { useState, useEffect } from "react";
import getMinGames from "../Utils";
import { Table } from "react-bootstrap";
import "./LeagueTable.css";

export default function LeagueTable(props) {
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [season, setSeason] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  

    if(props.users.length > 0){
      setUsers(props.users)
    }

    if(props.season){
      setSeason(props.season)
    }

    if(props.games.length > 0 && props.users.length > 0 && props.season){
      setGames(props.games)
      setIsLoading(false)
    }

  }, [props.games, props.users, props.season]);

  function countWins(user){
    return games.filter(x => x.winner === user._id).length
  }

  function countLosses(user){
    return games.filter(x => x.loser === user._id).length
  }

  function countPlayed(user){
    return games.filter(x => x.winner === user._id || x.loser === user._id).length
  }

  function countSevenBallsFor(user){
    return games.filter(x => x.winner === user._id && x.special === "seven").length
  }

  function countSevenBallsAgainst(user){
    return games.filter(x => x.loser === user._id && x.special === "seven").length
  }

  function countFoulsFor(user){
    return games.filter(x => x.winner === user._id && x.special === "foul").length
  }

  function countFoulsAgainst(user){
    return games.filter(x => x.loser === user._id && x.special === "foul").length
  }

  function calculatePoints(user){
    return countWins(user) + countSevenBallsFor(user)*2 - countFoulsFor(user)*0.5
  }

  function calculateTNSR(user){
    let losses = countLosses(user) > 0 ? countLosses(user) : 1
    
    return calculatePoints(user) / (losses + countPenalty(user) )
  }

  function countUnderMin(user){
    return countPlayed(user) < getMinGames(season) ? getMinGames(season) - countPlayed(user) : 0
  }

  function countUnplayed(user){
    const unique = []

    getGamesForUser(user).forEach((game) => {
      if(game.winner == user._id && !unique.some(opponent => opponent == game.loser) ){
        unique.push(game.loser)
      }else if (game.loser == user._id && !unique.some(opponent => opponent == game.winner) ){
        unique.push(game.winner)
      }
    })

    return users.length - unique.length
  }

  function countPenalty(user){
    return countUnderMin(user) + countUnplayed(user)
  }

  function getGamesForUser(user){
    return games.filter(game => game.winner == user._id || game.loser == user._id)
  }

  function calculateWinsToFirst(user){
    let max = users.sort(compareTNSR)[0]
    let TNSRdiff = calculateTNSR(max) - calculateTNSR(user) + 0.01
    let losses = countLosses(user) > 0 ? countLosses(user) : 1
    let penalty = countPenalty(user)

    return max === user ? 0 : Math.ceil(TNSRdiff * (losses+countPenalty(user)))
  }

  function calculateWinsToRankUp(user){
    let index = users.sort(compareTNSR).indexOf(user)

    if(index === 0 ){
      return 0
    }else{
      let upOne = users[index-1]
      let TNSRdiff = calculateTNSR(upOne) - calculateTNSR(user) + 0.01
      let losses = countLosses(user) > 0 ? countLosses(user) : 1
      return Math.ceil(TNSRdiff * (losses+countPenalty(user)))
    }
    
  }

  function compareTNSR(a, b) {
    return calculateTNSR(b) - calculateTNSR(a);
  }

  function compareTNSRthenLosses(a, b) {

    if (calculateTNSR(a) > calculateTNSR(b)) return -1;
    if (calculateTNSR(a) < calculateTNSR(b)) return 1;

    if (countLosses(a) > countLosses(b)) return 1;
    if (countLosses(a) < countLosses(b)) return -1;
  }

  return (

    <div className="LeagueTable">
        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Rank</th>
              <th>Player</th>
              <th>Played</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>7 Balls (F/A)</th>
              <th>Fouls (F/A)</th>
              <th>Points</th>
              <th>Penalty</th>
              <th>TNSR</th>
              <th>Wins to #1</th>
              <th>Wins to +1</th>
            </tr>
          </thead>

          <tbody>

          { !isLoading && 
            users.sort(compareTNSRthenLosses).map((user, index) => {
              return (
                <tr key={user._id}>
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

          { isLoading && users.length > 0 &&
            users.sort(compareTNSRthenLosses).map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index+1}</td>
                  <td>{user.name}</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0 / 0</td>
                  <td>0 / 0</td>
                  <td>0</td>
                  <td>{users.length-1 + getMinGames(season)}</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              )
            })

          }
          </tbody>

        </Table>
    </div>

  );
}