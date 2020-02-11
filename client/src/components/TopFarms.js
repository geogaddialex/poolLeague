import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty, myRow } from "../Utils/Utils"
import { userPlayed } from "../Utils/UserUtils"

import "./TopFarms.css";

export default function TopFarms(props) {

  const [topFarms, setTopFarms] = useState([]);

  useEffect(() => {  

    setTopFarms(getTopFarms())

  }, [props.games]);

  function getTopFarms(){
    const unique = []

    props.games.forEach((game) => {
      if (!unique.some(result => result.winner._id+result.loser._id == game.winner._id+game.loser._id)){
        unique.push(game)
      }
    })

    const farms = unique.map( result => {
      result.farm = countOccurences(result)
      return result
    })

    return farms
  }

  function countOccurences(unique){
    let wins = 0
    let losses = 0

    props.games.forEach(game =>{
      if( game.winner._id == unique.winner._id && game.loser._id == unique.loser._id ){
        wins ++
      }else if( game.winner._id == unique.loser._id && game.loser._id == unique.winner._id ){
        losses ++
      }
    })

    const farm = wins - losses
    return farm
  }

  function compareOccurences(a, b) {
    return b.farm - a.farm
  }

  return (

    <div className="TopFarms">
      <p><b>Top Farms</b></p>

        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Farmer</th>
              <th>Farmed</th>
              <th>#</th>
            </tr>
          </thead>

          <tbody>
          { 
            topFarms
              .sort(compareOccurences)
              .slice(0, props.limit)
              .map((result, index) => {
                return (
                  <tr key={result.winner._id + result.loser._id} style={ userPlayed(result, props.user) ? myRow : null}>
                    <td>{result.winner.name}</td>
                    <td>{result.loser.name}</td>
                    <td>{result.farm}</td>
                  </tr>
                )
              })
          }
          </tbody>
        
        </Table>
      
    </div>

  );
}