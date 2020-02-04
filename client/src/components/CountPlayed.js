import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty } from "../Utils"
import "./CountPlayed.css";

export default function CountPlayed(props) {

  const myRow = {
    backgroundColor: "#ebebf8",
    fontWeight: "bold"
  };

  function getPlayed(){

    console.log("props.users = " + JSON.stringify(props.users))

    if(isEmpty(props.users)){
      return 0
    }

    const count = props.users.filter(player => player._id !== props.player).map( player =>{

      let wins = 0
      let losses = 0

        props.games.forEach(game =>{

          if( game.winner._id == player._id){
            player.losses ++
          }else if(game.loser._id == player._id){
            player.wins ++
          }

        })

        return player
    })
    
    return count
  }

  function compareFarms(a, b) {
    return (b.wins-b.losses) - (a.wins-a.losses)
  }

  return (

    <div className="CountPlayed">
      <p><b>Opponents</b></p>
      <Table striped bordered condensed hover>

        <thead>
          <tr>
            <th>Played</th>
            <th>Count</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Farm</th>
          </tr>
        </thead>

        <tbody>
         {  isEmpty(props.users) && 
              getPlayed()
              .sort(compareFarms)
              .slice(0, props.limit)
              .map((player, index) => {
                return (
                  <tr key={player._id} style={ player._id == props.user._id ? myRow : null} >
                    <td>{player.name}</td>
                    <td>{player.wins + player.losses}</td>
                    <td>{player.wins}</td>
                    <td>{player.losses}</td>
                    <td>{player.wins - player.losses}</td>
                  </tr>
                )
              })
          }
        </tbody>
      
      </Table>
    </div>

  );
}