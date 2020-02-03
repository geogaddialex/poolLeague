import React, { useState, useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import LatestResults from "../components/LatestResults";
import CountPlayed from "../components/CountPlayed";
import AddSeason from "../components/CountPlayed";
import { isEmpty, userInSeason } from "../Utils";
import "./Home.css";

export default function user(props) {

	const { match: { params } } = props;

	const numberOfResults = 10;

	function getName(userId){
		return props.seasons[0].players.find(player => player._id == userId).name
	}

	function userPlayedIn(game){
		return game.winner._id == params.userId || game.loser._id == params.userId
	}

  	return (
	    <div className="User">

	    	{ props.seasons.length > 0 ?

		    	!isEmpty(props.seasons[0].players) && userInSeason(props.seasons[0], params.userId) ?

	    		<>
	    			<h1>{getName(params.userId)}</h1>
					{ props.games.filter(x => userPlayedIn(x)).length > 0 ?
						<Row>
							<Col xs={12} sm={8}><LatestResults user={props.user} limit={numberOfResults} season={props.seasons[0]} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
							 <Col xs={12} sm={4}><CountPlayed user={props.user} player={params.userId} season={props.seasons[0]} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
					    </Row>
					:
					<Alert bsStyle="info">
						No games played
					</Alert>
					}
				</>

				:

					<Alert bsStyle="info">
						This user hasn't joined the season!
					</Alert>
		    :
		    	<Alert bsStyle="info">
			    	No seasons exist!
			    </Alert>
		    }
       	</div>
	);
}