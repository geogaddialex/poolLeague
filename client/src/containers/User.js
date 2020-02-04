import React, { useState, useEffect } from "react";
import { Row, Col, Alert, Tabs, Tab } from "react-bootstrap";
import LatestResults from "../components/LatestResults";
import CountPlayed from "../components/CountPlayed";
import AddSeason from "../components/AddSeason";
import Season from "../components/Season";
import UserSeason from "../components/UserSeason";
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
		return props.seasons[0].players.find(player => player._id == userId).name
	}

	function userPlayedIn(game){
		return game.winner._id == params.userId || game.loser._id == params.userId
	}

  	return (
	    <div className="User">

	    	<h1>{getName(params.userId)}</h1>

	    	{ !isEmpty(props.users) &&

				<Tabs activeKey={key} id="tabs">

					<div key={0}>
						<Tab key={0} eventKey={0} title="All time">
							<Row>
								<Col xs={12} sm={8}><LatestResults user={props.user} limit={numberOfResults} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
								<Col xs={12} sm={4}><CountPlayed user={props.user} player={params.userId} users={props.users} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
							</Row>
						</Tab>
			        </div>

					{ props.seasons.sort(startedEarliest).map((season, index) => {

						const gamesForSeason = getGamesForSeason(props.games.filter(x => userPlayedIn(x)), season)

						if( index == 0 ){
							return(
							<div key={index+1}>
								// <Tab key="0" eventKey="0" title="All time">
								// 	<Row>
								// 		<Col xs={12} sm={8}><LatestResults user={props.user} limit={numberOfResults} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
								// 		<Col xs={12} sm={4}><CountPlayed user={props.user} users={props.users} player={params.userId} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
								// 	</Row>
								// </Tab>
								<Tab key={index+1} eventKey={index+1} title={season.name}>
					          		<UserSeason key={index} user={props.user} games={gamesForSeason} season={season} />
					        	</Tab>
					        </div>
							)
						}

						return (
				        	<Tab key={index+1} eventKey={index+1} title={season.name}>
				          		<UserSeason key={index} user={props.user} games={gamesForSeason} season={season} />
				        	</Tab>
				    	)
					})}

				</Tabs>	
			}

       	</div>
	);
}