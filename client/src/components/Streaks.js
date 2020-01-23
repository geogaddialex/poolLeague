import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./Streaks.css";

export default function Streaks(props) {
  const [streaks, setStreaks] = useState([]);
  const [season, setSeason] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  

    if(props.season !== undefined){
      setSeason(props.season)
    }

    if(props.games.length > 0 && props.season !== undefined){

      setStreaks(getStreaks(props.games, props.season.players))
      setIsLoading(false)
    }

  }, [props.games, props.season]);

  function getStreaks(games, users){
    return season.players.map(user => {

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
      
        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Player</th>
              <th>Streak</th>
            </tr>
          </thead>

          <tbody>
          { !isLoading &&
            streaks.sort(compareStreaks).map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.streak}</td>
                </tr>
              )
            })
          }

          {
            isLoading && season.players &&
            season.players.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
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