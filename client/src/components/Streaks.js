import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./Streaks.css";

export default function Streaks(props) {
  const [streaks, setStreaks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  

    if(props.games.length > 0 && props.users.length > 0){
      setStreaks(getStreaks(props.games, props.users))
      setIsLoading(false)
    }

  }, [props.games, props.users]);

  function getStreaks(games, users){
    return users.map(user => {

      const sortedGames = games.filter(game => game.winner == user._id || game.loser == user._id).sort(sortGamesByDate).reverse()
      const lastWin = sortedGames.findIndex( game => game.winner == user._id )
      const lastLoss = sortedGames.findIndex( game => game.loser == user._id )

      if( lastWin == -1 ){
        user.streak = sortedGames.length * -1

      }else if( lastLoss == -1){
        user.streak = sortedGames.length
      }else{
        user.streak = lastLoss - lastWin
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
            streaks.filter(x => x.streak != 0).sort(compareStreaks).map((user, index) => {
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