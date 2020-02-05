import React, { useState, useEffect } from "react";
import { Row, Col, Alert, Tabs, Tab } from "react-bootstrap";
import LatestResults from "../components/LatestResults";
import AddSeason from "../components/AddSeason";
import Season from "../components/Season";
import UserSeason from "../components/UserSeason";
import AllTimeUserSeason from "../components/AllTimeUserSeason";
import { isEmpty, userInSeason, getGamesForSeason, getMinGames } from "../Utils";
import "./Home.css";

export default function User(props) {

	const { match: { params } } = props;
	const numberOfResults = 10;
	const [key, setKey] = useState()

	function startedEarliest(a,b){
		return new Date(a.start).getTime() < new Date(b.start).getTime()
	}

	function getName(userId){
		return props.users.find(player => player._id == userId).name
	}

	function userPlayedIn(game){
		return game.winner._id == params.userId || game.loser._id == params.userId
	}

  	return (
	    <div className="User">

	    	{ !isEmpty(props.users) && props.users.find(player => player._id == params.userId) ?

	    		<>

	    		<h1>{getName(params.userId)}</h1>

				<Tabs activeKey={key} id="tabs">

					<Tab key={props.seasons.length} eventKey={props.seasons.length} title="All Time">
				        <AllTimeUserSeason key={props.seasons.length}  users={props.users} player={params.userId} user={props.user} games={props.games} />
				    </Tab>

					{ props.seasons.sort(startedEarliest).filter(season => userInSeason(season, params.userId)).map((season, index) => {

						const gamesForSeason = getGamesForSeason(props.games.filter(x => userPlayedIn(x)), season)

						return (
				        	<Tab key={index} eventKey={index} title={season.name}>
				          		<UserSeason key={index} player={params.userId} user={props.user} games={gamesForSeason} season={season} />
				        	</Tab>
				    	)
					})}

				</Tabs>	
				</>

			:

				<Alert bsStyle="info">
		        	<strong>Uh oh!</strong> This user doesn't exist
		      	</Alert>
			}

       	</div>
	);
}