import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./LeastPlayed.css";

export default function LeastPlayed(props) {
  const [leastPlayed, setLeastPlayed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState([]);
  const [games, setGames] = useState([]);
  const numberOfResults = 5;

  useEffect(() => {  

    if(props.season !== undefined){
      setSeason(props.season)
    }

    if(props.games.length > 0 && props.season !== undefined){
      setLeastPlayed(getLeastPlayed(props.games))
      setIsLoading(false)
    }

  }, [props.games, props.season]);

  function getLeastPlayed(games){
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
    return season.players.find(x => x._id == userId).name
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
          { !isLoading &&
            leastPlayed.slice(0, numberOfResults).map((result, index) => {
              return (
                <tr key={result.winner + result.loser}>
                  <td>{getName(result.winner)} - {getName(result.loser)}</td>
                  <td>{result.count}</td>
                </tr>
              )
            })
          }

          { isLoading &&

            [...Array(numberOfResults)].map((e, i) => {
              return (
                  <tr key={i}>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                )
            })
          }

          </tbody>
        

        </Table>
    </div>

  );
}