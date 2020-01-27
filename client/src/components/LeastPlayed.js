import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty } from "../Utils"
import "./LeastPlayed.css";

export default function LeastPlayed(props) {
  
  function getLeastPlayed(){
    const unique = []

    props.season.players.forEach(playerOne =>{
      props.season.players.forEach(playerTwo =>{
        if ( playerOne._id !== playerTwo._id && !unique.some(combo => playerOne._id+playerTwo._id == combo.playerOne._id+combo.playerTwo._id || playerTwo._id+playerOne._id == combo.playerOne._id+combo.playerTwo._id)){
            
          var newCombo = {playerOne: playerOne, playerTwo: playerTwo}
          unique.push(newCombo)
        }
      })
    })

    const count = unique.map( x =>{
      x.count = countOccurences(x) 
      return x
    })
    
    return count
  }

  function countOccurences(unique){
    let count = 0

    props.games.forEach(x =>{
      if( x.winner._id == unique.playerOne._id && x.loser._id == unique.playerTwo._id ){
        count ++
      }else if( x.winner._id == unique.playerTwo._id && x.loser._id == unique.playerOne._id ){
        count ++
      }
    })
    return count
  }

  function compareOccurences(a, b) {
    return a.count - b.count
  }

  return (

    <div className="LeastPlayed">
        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Least Played</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
          { getLeastPlayed()
            .sort(compareOccurences)
            .slice(0, props.limit)
            .map((combo, index) => {
              return (
                <tr key={combo.playerOne._id + combo.playerTwo._id} >
                  <td>{combo.playerOne.name} - {combo.playerTwo.name}</td>
                  <td>{combo.count}</td>
                </tr>
              )
            })
          }
          </tbody>
        

        </Table>
    </div>

  );
}