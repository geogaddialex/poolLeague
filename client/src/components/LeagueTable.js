import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./LeagueTable.css";

export default function LeagueTable(props) {
  const [games, setGames] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  

    if(props.games.length > 0 && props.users.length > 0){
      setGames(props.games)
      setUsers(props.users)
      setIsLoading(false)
    }

  }, [props.games, props.users]);

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
    return calculatePoints(user) / losses
  }

  function calculateWinsToFirst(user){
    let max = users.sort(compareTNSR)[0]
    let losses = countLosses(user) > 0 ? countLosses(user) : 1
    return max === user ? 0 : Math.ceil((calculateTNSR(max)+0.01) * losses - calculatePoints(user))
  }

  function calculateWinsToRankUp(user){
    let index = users.sort(compareTNSR).indexOf(user)
    let losses = countLosses(user) > 0 ? countLosses(user) : 1
    return index === 0 ? 0 :  Math.ceil((calculateTNSR(users[index-1])+0.01) * losses - calculatePoints(user))
  }

  function compareTNSR(a, b) {
    return calculateTNSR(b) - calculateTNSR(a);
  }

  return (

    <div className="LeagueTable">
      { !isLoading && 
        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Season 4</th>
              <th>Played</th>
              <th>Wins</th>
              <th>Losses</th>
              <th>7 Balls (F/A)</th>
              <th>Fouls (F/A)</th>
              <th>Points</th>
              <th>TNSR</th>
              <th>Wins to #1</th>
              <th>Wins to +1</th>
            </tr>
          </thead>

          <tbody>
          {
            users.sort(compareTNSR).filter(x => countPlayed(x) > 0).map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{countPlayed(user)}</td>
                  <td>{countWins(user)}</td>
                  <td>{countLosses(user)}</td>
                  <td>{countSevenBallsFor(user)} / {countSevenBallsAgainst(user)}</td>
                  <td>{countFoulsFor(user)} / {countFoulsAgainst(user)}</td>
                  <td>{calculatePoints(user)}</td>
                  <td>{Math.round(calculateTNSR(user) * 100) / 100}</td>
                  <td>{calculateWinsToFirst(user)}</td>
                  <td>{calculateWinsToRankUp(user)}</td>
                </tr>
              )
            })
          }
          </tbody>

        </Table>
      }
    </div>

  );
}