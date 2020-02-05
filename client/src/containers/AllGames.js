import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Tab, Alert, Button, Table } from "react-bootstrap";
import AllTimeLeagueTable from "../components/AllTimeLeagueTable";
import TopFarms from "../components/TopFarms";
import MostPlayed from "../components/MostPlayed";
import LeastPlayed from "../components/LeastPlayed";
import { isEmpty, isSeasonOpen, myRow, formatDateAndTime } from "../Utils";
import { userPlayed } from "../UserUtils"
import "./All.css";

export default function Home(props) {

	function compareCreatedAt(a,b){
    	return new Date(b.createdAt) - new Date(a.createdAt);
  	}

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
	    <div className="AllGames">

		{ !isEmpty(props.games) && props.games.length > 0 ?

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
		          .sort(compareCreatedAt)
		          .map((game, index) => {
		            return (
		              <tr key={game._id} style={ userPlayed(game, props.user) ? myRow : null}>
		                <td>{formatDateAndTime(game.createdAt)}</td>
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