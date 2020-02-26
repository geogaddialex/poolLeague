import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import * as UserUtils from "../Utils/UserUtils"
import * as Utils from "../Utils/Utils"
import "./CountPlayed.css";

export default function CountPlayed(props) {

  function getPlayed(){

    const count = props.players.filter(player => player._id !== props.player).map( player =>{

      player.wins = 0
      player.losses = 0

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
            <th>Opponent</th>
            <th>Played</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Farm</th>
          </tr>
        </thead>

        <tbody>
         {  !Utils.isEmpty(props.players) && 
              getPlayed()
              .sort(compareFarms)
              .map((player, index) => {

                return (
                  <tr key={index} style={ player._id == props.user._id ? UserUtils.myRow : null} >
                    <td><b><a href={`/user/${player._id}`}>{player.name}</a></b></td>
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