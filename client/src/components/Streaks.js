import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import * as UserUtils from "../Utils/UserUtils"
import * as Utils from "../Utils/Utils"
import "./Streaks.css";

export default function Streaks(props) {
  const [streaks, setStreaks] = useState([]);

  useEffect(() => {  

      getStreaks(props.games, props.season.players)

  }, [props.games, props.season]);

  function getStreaks(games, users){
    setStreaks(users.map(user => {

      const sortedGames = props.games.filter(game => game.winner._id == user._id || game.loser._id == user._id).sort(Utils.compareCreatedAt)
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
                <tr key={user._id} style={ user._id == props.user._id ? UserUtils.myRow : null}>
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