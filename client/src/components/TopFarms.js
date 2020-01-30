import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty, userPlayed, myRow } from "../Utils"
import "./TopFarms.css";

export default function TopFarms(props) {

  const [topFarms, setTopFarms] = useState([]);

  useEffect(() => {  

      getTopFarms(props.games)

  }, [props.games]);

  function getTopFarms(games){
    const unique = []

    props.games.forEach((game) => {
      if (!unique.some(result => result.winner._id+result.loser._id == game.winner._id+game.loser._id)){
        unique.push(game)
      }
    })

    const count = unique.map( result => {
      result.count = countOccurences(result) 
      return result
    }).filter( result => result.count > 0)
    
    setTopFarms(count)
  }

  function countOccurences(unique){
    let count = 0
    let negatives = 0

    props.games.forEach(game =>{
      if( game.winner._id == unique.winner._id && game.loser._id == unique.loser._id ){
        count ++
      }else if( game.winner._id == unique.loser._id && game.loser._id == unique.winner._id ){
        negatives ++
      }
    })

    return count - negatives
  }

  function compareOccurences(a, b) {
    return b.count - a.count
  }

  return (

    <div className="TopFarms">
      <p><b>Top Farms</b></p>

        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Winner</th>
              <th>Loser</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
          { !isEmpty(props.season.players) &&
            topFarms
              .sort(compareOccurences)
              .slice(0, props.limit)
              .map((result, index) => {
                return (
                  <tr key={result.winner._id + result.loser._id} style={ userPlayed(result, props.user) ? myRow : null}>
                    <td>{result.winner.name}</td>
                    <td>{result.loser.name}</td>
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