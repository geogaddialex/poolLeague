import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty } from "../Utils"
import "./TopFarms.css";

export default function TopFarms(props) {
  const [topFarms, setTopFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {  

    if(!isEmpty(props.season) ){
      setSeason(props.season)
    }

    if(props.games.length > 0 && !isEmpty(props.season) ){
      setGames(props.games)
      setTopFarms(getTopFarms(props.games))
      setIsLoading(false)
    }

  }, [props.games, props.season]);

  function getTopFarms(games){
    const unique = []

    games.forEach((game) => {
      if (!unique.some(result => result.winner+result.loser == game.winner+game.loser)){
        unique.push(game)
      }
    })

    const count = unique.map( result => {
      result.count = countOccurences(result) 
      return result
    }).filter( result => result.count > 0)
    .sort(compareOccurences)
    .slice(0, 10)
    
    return count
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
    return season.players.find(x => x._id == userId).name
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
      }
    </div>

  );
}