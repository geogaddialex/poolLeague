import React, { useState, useEffect } from "react";
import { Row, Col, Alert, Tabs, Tab } from "react-bootstrap";
import LatestResults from "../components/LatestResults";
import AddSeason from "../components/AddSeason";
import Season from "../components/Season";
import UserSeason from "../components/UserSeason";
import AllTimeUserSeason from "../components/AllTimeUserSeason";
import { isEmpty, getGamesForSeason, getMinGames } from "../Utils";
import { getName, userInSeason, userPlayed, getUser } from "../UserUtils";
import "./Home.css";

export default function User(props) {

	const { match: { params } } = props;
	const numberOfResults = 10;
	const [key, setKey] = useState()
	var player = getUser(params.userId, props.users)

	function startedEarliest(a,b){
		return new Date(a.start).getTime() < new Date(b.start).getTime()
	}
  	
  	return (
	    <div className="User">

	    	{ !isEmpty(props.users) && props.users.find(player => player._id == params.userId) ?

	    		<>

	    		<h2>{getName(params.userId, props.users)}</h2>

				<Tabs activeKey={key} id="tabs">

					<Tab key={props.seasons.length} eventKey={props.seasons.length} title="All Time">
				        <AllTimeUserSeason key={props.seasons.length} users={props.users} player={params.userId} user={props.user} seasons={props.seasons} games={props.games} />
				    </Tab>

					{ props.seasons.sort(startedEarliest).filter(season => userInSeason(season, params.userId)).map((season, index) => {

						const gamesForSeason = getGamesForSeason(props.games.filter(game => userPlayed(game, player)), season)

						return (
				        	<Tab key={index} eventKey={index} title={season.name}>
				          		<UserSeason key={index} player={params.userId} users={props.users} user={props.user} games={gamesForSeason} season={season} />
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