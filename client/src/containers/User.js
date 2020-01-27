import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import LeagueTable from "../components/LeagueTable";
import AddGame from "../components/AddGame";
import LatestResults from "../components/LatestResults";
import TopFarms from "../components/TopFarms";
import CountPlayed from "../components/CountPlayed";
import Streaks from "../components/Streaks";
import SeasonInfo from "../components/SeasonInfo";
import RunTheNumbers from "../components/RunTheNumbers";
import AddSeason from "../components/AddSeason";
import { isEmpty } from "../Utils";
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

	    <h1>{getName(params.userId)}</h1>

		    { props.seasons.length > 0 && !isEmpty(props.seasons[0].players) &&

	    		<>
					{ props.games.filter(x => userPlayedIn(x)).length > 0 ?
						<Row>
							<Col xs={12} sm={8}><LatestResults user={props.user} limit={numberOfResults} season={props.seasons[0]} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
							 <Col xs={12} sm={4}><CountPlayed user={props.user} player={params.userId} season={props.seasons[0]} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
					    </Row>
					:
					    <h3> No games played </h3>
					}
				</>
		    }

		    { props.seasons.length < 1 &&
		    	<>
			    	<h3>No seasons exist!</h3>
		    	</>
		    }
       	</div>
	);
}