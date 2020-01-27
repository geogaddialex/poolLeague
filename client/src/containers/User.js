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

	const numberOfResults = 10;

	function userPlayedIn(game){
		return game.winner._id == props.user._id || game.loser._id == props.user._id
	}

  	return (
	    <div className="User">

		    { props.seasons.length > 0 && !isEmpty(props.seasons[0].players) &&

	    		<>
					{ props.games.filter(x => userPlayedIn(x)).length > 0 ?
						<Row>
							<Col xs={12} sm={6} md={3}><LatestResults limit={numberOfResults} season={props.seasons[0]} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
							 <Col xs={12} sm={6} md={4}><CountPlayed user={props.user} season={props.seasons[0]} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
					    </Row>
					:
					    <h2> No games played </h2>
					}
				</>
		    }

		    { props.seasons.length < 1 &&
		    	<>
			    	<h2>No seasons exist!</h2>
		    	</>
		    }
       	</div>
	);
}