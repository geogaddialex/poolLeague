import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty } from "../Utils"
import "./MostPlayed.css";

export default function MostPlayed(props) {

  function getMostPlayed(){
    const unique = []

    props.games.forEach((game) => {
      if (!unique.some(result => result.winner._id+result.loser._id == game.winner._id+game.loser._id || result.loser._id+result.winner._id == game.winner._id+game.loser._id)){
        unique.push(game)
      }
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
      if( x.winner._id == unique.winner._id && x.loser._id == unique.loser._id){
        count ++
      }else if( x.winner._id == unique.loser._id && x.loser._id == unique.winner._id ){
        count ++
      }
    })
    return count
  }

  function compareOccurences(a, b) {
    return b.count - a.count
  }

  return (

    <div className="MostPlayed">
      <Table striped bordered condensed hover>

        <thead>
          <tr>
            <th>Most Played</th>
            <th>Count</th>
          </tr>
        </thead>

        <tbody>
         {
            getMostPlayed()
            .filter(x => x.count > 0)
            .sort(compareOccurences)
            .slice(0, props.limit)
            .map((result, index) => {
              return (
                <tr key={result.winner._id + result.loser._id}>
                  <td>{result.winner.name} - {result.loser.name}</td>
                  <td>{result.count}</td>
                </tr>
              )
            })
          }
        </tbody>
      

      </Table>
    </div>

  );
}