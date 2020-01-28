import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import LeagueTable from "../components/LeagueTable";
import AddGame from "../components/AddGame";
import LatestResults from "../components/LatestResults";
import TopFarms from "../components/TopFarms";
import MostPlayed from "../components/MostPlayed";
import LeastPlayed from "../components/LeastPlayed";
import Streaks from "../components/Streaks";
import SeasonInfo from "../components/SeasonInfo";
import RunTheNumbers from "../components/RunTheNumbers";
import AddSeason from "../components/AddSeason";
import { isEmpty } from "../Utils";
import "./Home.css";

export default function Home(props) {

	const numberOfResults = 10;

	function userInSeason(){
		return props.seasons[0].players.some(player => player._id == props.user._id)
	}

  	return (
	    <div className="Home">

		    { props.seasons.length > 0 && !isEmpty(props.seasons[0].players) &&

	    		<>
	    			<Row> 
						<Col xs={12} sm={9}> 
							<Row><Col xs={12}><LeagueTable user={props.user} games={props.games} season={props.seasons[0]} runTheNumbers={props.runTheNumbers} /></Col></Row>
							{  !isEmpty(props.user) && userInSeason(props.user) &&
								<Row>      
								    <Col xs={12} md={6} class="equal"><AddGame games={props.games} season={props.seasons[0]} user={props.user} /></Col>
								    <Col xs={12} md={6} class="equal"><RunTheNumbers season={props.seasons[0]} runTheNumbers={props.runTheNumbers} setRunTheNumbers={props.setRunTheNumbers} /></Col>
							    </Row>
							}
							{ props.games.length > 0 &&
								<Row>
									<Col xs={12}><LatestResults user={props.user} limit={50} season={props.seasons[0]} games={props.games} /></Col>
								   
							    </Row>
							}
						</Col>
						<Col xs={12} sm={3}>
							<Row><Col xs={12}><SeasonInfo games={props.games} season={props.seasons[0]} user={props.user} /></Col></Row>
							{ props.games.length > 0 && 
								<Row>
									<Col xs={12}><Streaks user={props.user} season={props.seasons[0]} games={props.games} /></Col>
									<Col xs={12}><TopFarms user={props.user} limit={numberOfResults} season={props.seasons[0]} games={props.games} /></Col>
									<Col xs={12}><MostPlayed user={props.user} limit={numberOfResults} season={props.seasons[0]} games={props.games} /></Col>
								    <Col xs={12}><LeastPlayed limit={numberOfResults} season={props.seasons[0]} games={props.games} /></Col>
								</Row> 
							}
						</Col>		
					</Row>
				</>
		    }

		    { !props.seasons.length < 1 && isEmpty(props.seasons[0].players) &&
		    	<>
			    	<h3>No players have entered the season, be the first!</h3>
			    	<SeasonInfo games={props.games} season={props.seasons[0]} user={props.user} />
		    	</>
		    }

		    { props.seasons.length < 1 &&
		    	<>
			    	<h3>No seasons exist!</h3>
			    	{ !isEmpty(props.user) &&
			    		<AddSeason />
			    	}
		    	</>
		    }
       	</div>
	);
}