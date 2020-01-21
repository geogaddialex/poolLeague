import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./Streaks.css";

export default function Streaks(props) {
  const [streaks, setStreaks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  

    setStreaks(getStreaks(props.games, props.users))
    setIsLoading(false)

  }, [props.games, props.users]);

  function getStreaks(games, users){
    return users.map(user => {

      var sortedGames = games.sort(sortGamesByDate)
      console.log(JSON.stringify(sortedGames))

      const lastWin = sortedGames.findIndex( game => game.winner == user._id )
      const lastLoss = sortedGames.findIndex( game => game.loser == user._id )
      console.log("lastWin = " + lastWin + " / lastLoss = " + lastLoss)
      const won = lastWin > lastLoss

      if(won){
        var wins = games.slice(lastLoss, lastWin-2)
        console.log("wins = " + wins)
        user.streak = wins
      }else{
        var losses = games.slice(lastWin, lastLoss-2)
        console.log("losses = " + losses)
        user.streak = losses * -1
      }

      return user
    })
  }

  function compareStreaks(a, b) {
    return b.streak - a.streak
  }

  function sortGamesByDate(a, b){
    return a.createdAt - b.createdAt
  }

  return (

    <div className="Streaks">
      { !isLoading &&
        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Player</th>
              <th>Streak</th>
            </tr>
          </thead>

          <tbody>
          {
            streaks.sort(compareStreaks).map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.streak}</td>
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