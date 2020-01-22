import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./LastFive.css";

export default function LastFive(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const numberOfResults = 5;

  useEffect(() => {  

    if(props.users.length > 0){
      setUsers(props.users)
    }

    if(props.games.length > 0 && props.users.length > 0){
      setGames(props.games)
      setIsLoading(false)
    }

  }, [props.games, props.users]);


  function getName(userId){
    return users.find(user => user._id == userId).name
  }

  return (

    <div className="LastFive">

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
                  <tr>
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