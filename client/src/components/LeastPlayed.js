import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty } from "../Utils"
import "./LeastPlayed.css";

export default function LeastPlayed(props) {
  
  const numberOfResults = 5;
  const [leastPlayed, setLeastPlayed] = useState({});

  useEffect(() => {  

      getLeastPlayed(props.games)

  }, [props.games]);

  function getLeastPlayed(games){
    const unique = []

    props.games.forEach((game) => {
      if (!unique.some(result => result.winner+result.loser == game.winner+game.loser)){
        unique.push(game)
      }
    })

    const count = unique.map( x =>{
      x.count = countOccurences(x) 
      return x
    }).sort(compareOccurences)
    
    setLeastPlayed(count)
  }

  function countOccurences(unique){
    let count = 0

    props.games.forEach(x =>{
      if( x.winner == unique.winner && x.loser == unique.loser ){
        count ++
      }else if( x.winner == unique.loser && x.loser == unique.winner ){
        count ++
      }
    })

    return count
  }

  function compareOccurences(a, b) {
    return a.count - b.count
  }

  function getName(userId){
    return props.season.players.find(x => x._id == userId).name
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
          { leastPlayed.length > 0 &&
            leastPlayed.slice(0, numberOfResults).map((result, index) => {
              return (
                <tr key={result.winner + result.loser}>
                  <td>{getName(result.winner)} - {getName(result.loser)}</td>
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