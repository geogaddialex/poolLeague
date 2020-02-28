import React, { useState, useEffect } from "react";
import { Table, Button, Glyphicon } from "react-bootstrap";
import * as Utils from "../Utils/Utils"
import * as UserUtils from "../Utils/UserUtils"
import Excuses from "./Excuses"
import "./LatestResults.css";

export default function LatestResults(props) {

  const [limit, setLimit] = useState(props.limit)

  function loadMore(){
    setLimit(limit+10)
  }

  function canLoadMore(){
    return limit < props.games.length
  }

  return (

    <div className="LatestResults">
      <p><b>Latest Results</b></p>
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Winner</th>
            <th>Loser</th>
            <th>Special</th>
            <th>Excuses</th>
          </tr>
        </thead>

        <tbody>
        {
          props.games
          .sort(Utils.compareCreatedAt)
          .slice(0, limit)
          .map((game, index) => {
            return (
              <tr key={game._id} style={ UserUtils.userPlayed(game, props.user) ? UserUtils.myRow : null}>
                <td>{Utils.formatDateAndTime(game.createdAt)}</td>
                <td>{game.winner.name}</td>
                <td>{game.loser.name}</td>
                <td>{game.special}</td>
                <td><Excuses game={game} user={props.user}/></td>
              </tr>
            )
          })
        }
        </tbody>
      </Table>
      <Button onClick={loadMore} disabled={!canLoadMore()}>
        Load more
      </Button>
    </div>

  );
}