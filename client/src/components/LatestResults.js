import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./LatestResults.css";

export default function LatestResults(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [season, setSeason] = useState([]);
  const [games, setGames] = useState([]);
  const numberOfResults = 5;

  useEffect(() => {  

    if(props.season !== undefined){
      setSeason(props.season)
    }

    if(props.games.length > 0 && props.season !== undefined){
      setGames(props.games)
      setIsLoading(false)
    }

  }, [props.games, props.season]);


  function getName(userId){
    return season.players.find(user => user._id == userId).name
  }

  return (

    <div className="LatestResults">

        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Winner</th>
              <th>Loser</th>
              <th>Special</th>
            </tr>
          </thead>

          <tbody>

          { !isLoading &&
            props.games.slice(0, numberOfResults).map((result, index) => {
              return (
                <tr key={result.winner + result.loser + result.createdAt}>
                  <td>{getName(result.winner)}</td>
                  <td>{getName(result.loser)}</td>
                  <td>{result.special}</td>
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