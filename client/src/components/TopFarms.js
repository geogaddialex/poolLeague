import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty } from "../Utils"
import "./TopFarms.css";

export default function TopFarms(props) {

  const numberOfResults = 5;
  const [topFarms, setTopFarms] = useState([]);

  useEffect(() => {  

      getTopFarms(props.games)

  }, [props.games, props.season]);

  function getTopFarms(games){
    const unique = []

    props.games.forEach((game) => {
      if (!unique.some(result => result.winner+result.loser == game.winner+game.loser)){
        unique.push(game)
      }
    })

    const count = unique.map( result => {
      result.count = countOccurences(result) 
      return result
    }).filter( result => result.count > 0)
    .sort(compareOccurences)
    .slice(0, numberOfResults)
    
    setTopFarms(count)
  }

  function countOccurences(unique){
    let count = 0
    let negatives = 0

    props.games.forEach(game =>{
      if( game.winner == unique.winner && game.loser == unique.loser ){
        count ++
      }else if( game.winner == unique.loser && game.loser == unique.winner ){
        negatives ++
      }
    })

    return count - negatives
  }

  function compareOccurences(a, b) {
    return b.count - a.count
  }

  function getName(userId){
    return props.season.players.find(x => x._id == userId).name
  }

  return (

    <div className="TopFarms">

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
            topFarms.map((result, index) => {
              return (
                <tr key={result.winner + result.loser}>
                  <td>{getName(result.winner)}</td>
                  <td>{getName(result.loser)}</td>
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