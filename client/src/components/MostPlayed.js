import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { isEmpty } from "../Utils"
import "./MostPlayed.css";

export default function MostPlayed(props) {
  const [mostPlayed, setMostPlayed] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState([]);
  const [games, setGames] = useState([]);
  const numberOfResults = 5;

  useEffect(() => {  

    if(!isEmpty( props.season) ){
      setSeason(props.season)
    }

    if( props.games.length > 0 && !isEmpty( props.season) ){
      setMostPlayed(getMostPlayed(props.games))
      setIsLoading(false)
    }

  }, [props.games, props.season]);

  function getMostPlayed(games){
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
    return b.count - a.count
  }

  function getName(userId){
    return season.players.find(x => x._id == userId).name
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
        { !isLoading &&
          mostPlayed.filter(x=> x.count > 0).slice(0, numberOfResults).map((result, index) => {
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