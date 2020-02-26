import React from "react";
import { Row, Col, Tabs, Tab, Alert, Button, Table } from "react-bootstrap";
import * as Utils from "../Utils/Utils"
import * as UserUtils from "../Utils/UserUtils"
import "./Games.css";

export default function Games(props) {

  	async function deleteGame(id) {

	    fetch('/api/games/' + id, {
	      credentials: 'same-origin',
	      method: 'DELETE',
	      headers: { 'Content-Type': 'application/json' }
	    }).then(function(response){
	    	alert("game deleted: " + id)
	    })
  	}

  	return (
	    <div className="Games">
	    <h3>Games</h3>

		{ !Utils.isEmpty(props.games) && props.games.length > 0 ?

			<Table striped bordered condensed hover>
		        <thead>
		          <tr>
		            <th>Date</th>
		            <th>Winner</th>
		            <th>Loser</th>
		            <th>Special</th>
		            <th>Delete</th>
		          </tr>
		        </thead>

		        <tbody>
		        {
		          props.games
		          .sort(Utils.compareCreatedAt)
		          .map((game, index) => {
		            return (
		              <tr key={game._id} style={ UserUtils.userPlayed(game, props.user) ? UserUtils.myRow : null}>
		                <td>{Utils.formatDateAndTime(game.createdAt)}</td>
		                <td>{game.winner.name}</td>
		                <td>{game.loser.name}</td>
		                <td>{game.special}</td>
		                <td>
					      <Button onClick={() => {deleteGame(game._id)}} bsSize="small">
					        Delete
					      </Button>
		                </td>
		              </tr>
		            )
		          })
		        }
		        </tbody>
	      
	      	</Table>
	  	:
	  		<Alert>No games</Alert>
	  	}
       	</div>
	);
}