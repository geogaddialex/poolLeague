import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty } from "../Utils"
import "./Streaks.css";

export default function Streaks(props) {
  const [streaks, setStreaks] = useState([]);

  const myRow = {
    backgroundColor: "#ebebf8",
    fontWeight: "bold"
  };

  useEffect(() => {  

      getStreaks(props.games, props.season.players)

  }, [props.games, props.season]);

  function getStreaks(games, users){
    setStreaks(props.season.players.map(user => {

      const sortedGames = props.games.filter(game => game.winner._id == user._id || game.loser._id == user._id).sort(sortGamesByDate).reverse()
      const lastWin = sortedGames.findIndex( game => game.winner._id == user._id )
      const lastLoss = sortedGames.findIndex( game => game.loser._id == user._id )

      if( lastWin == -1 ){
        user.streak = sortedGames.length * -1
      }else if( lastLoss == -1){
        user.streak = sortedGames.length
      }else{
        user.streak = lastLoss - lastWin
      }
      
      return user
    }).filter(player => player.streak != 0))
  }

  function compareStreaks(a, b) {
    return b.streak - a.streak
  }

  function sortGamesByDate(a, b){
    return a.createdAt - b.createdAt
  }

  return (

    <div className="Streaks">
        <p><b>Streaks</b></p>

      
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
                <tr key={user._id} style={ user._id == props.user._id ? myRow : null}>
                  <td>{user.name}</td>
                  <td>{user.streak}</td>
                </tr>
              )
            })
          }

          </tbody>

        </Table>
    </div>

  );
}