import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./TopFarms.css";

export default function TopFarms(props) {
  const [topFarms, setTopFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  

    setTopFarms(getTopFarms(props.games))
    setIsLoading(false)

  }, [props.games]);

  function getTopFarms(games){
    const unique = []

    games.forEach((game) => {
      if (!unique.some(result => result.winner+result.loser == game.winner+game.loser)){
        unique.push(game)
      }
    })

    const count = unique.map( x =>{
      x.count = countOccurences(x) 
      return x
    }).sort(compareOccurences)
    
    return count
  }

  function countOccurences(unique){
    let count = 0
    let negatives = 0

    props.games.forEach(x =>{
      if( x.winner == unique.winner && x.loser == unique.loser ){
        count ++
      }else if( x.winner == unique.loser && x.loser == unique.winner ){
        negatives ++
      }
    })

    return count - negatives
  }

  function compareOccurences(a, b) {
    return b.count - a.count
  }

  function getName(userId){
    return props.users.find(x => x._id == userId).name
  }

  return (

    <div className="TopFarms">
      { !isLoading &&
        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Winner</th>
              <th>Loser</th>
              <th>Count</th>
            </tr>
          </thead>

          <tbody>
          {
            topFarms.filter(x=> x.count > 0).slice(0, 10).map((result, index) => {
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
      }
    </div>

  );
}