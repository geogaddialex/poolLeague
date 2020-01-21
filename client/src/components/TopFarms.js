import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import "./TopFarms.css";

export default function TopFarms(props) {
  const [topFarms, setTopFarms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let games = props.games

  useEffect(() => {  

    async function onLoad() {

    	Promise.all([getTopFarms()]).then(values => {
        setIsLoading(false)
    	})

    }

    onLoad();
  }, [props.isAuthenticated]);

  async function getTopFarms(){
    const unique = []

      console.log("games = " + JSON.stringify(games))
      games.forEach((game) => {

        if (!unique.some(result => result.winner+result.loser == game.winner+game.loser)){
          console.log("pushing")
          unique.push(game)
        }
      })

      console.log("unique = " + JSON.stringify(unique))

      const count = unique.map( x => x.count = countOccurences(x) ).sort(compareOccurences)

      console.log("count = " + JSON.stringify(count))
      setTopFarms(count)
      return count
  }

  function countOccurences(unique){
    return 0
  }

  function compareOccurences(a, b) {
    return b.count - a.count
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
            games.length > 0 && 
            topFarms.map((result, index) => {
              return (
                <tr key={result.winner + result.loser}>
                  <td>{result.winner}</td>
                  <td>{result.loser}</td>
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