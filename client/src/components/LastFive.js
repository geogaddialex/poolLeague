import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./LastFive.css";

export default function LastFive(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  

    if(props.games.length > 0){
        setIsLoading(false)
    }

  }, [props.games]);


  function getName(userId){
    return props.users.find(user => user._id == userId).name
  }

  return (

    <div className="LastFive">
      { !isLoading &&
        <Table striped bordered condensed hover>

          <thead>
            <tr>
              <th>Winner</th>
              <th>Loser</th>
              <th>Special</th>
            </tr>
          </thead>

          <tbody>
          {
            props.games.slice(0, 5).map((result, index) => {
              return (
                <tr key={result.winner + result.loser + result.createdAt}>
                  <td>{getName(result.winner)}</td>
                  <td>{getName(result.loser)}</td>
                  <td>{result.special}</td>
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