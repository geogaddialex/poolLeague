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
import { isEmpty } from "../Utils";
import "./Home.css";

export default function Home(props) {
  	const [games, setGames] = useState([]);
  	const [seasons, setSeasons] = useState([]);
  	const [user, setUser] = useState({});

	useEffect(() => {

		async function onLoad() {

			setUser(props.user)
			setGames(props.games)
			setSeasons(props.seasons)

		}

		onLoad();
	}, [props.user, props.games, props.seasons]);

  	return (
	    <div className="Home">

		    { !seasons.length < 1 && !isEmpty(seasons[0].players) &&
	    		<>
	    			<Row> 
						<Col xs={10}> <LeagueTable games={props.games} season={props.seasons[0]} /> </Col>
						<Col xs={2}> <SeasonInfo games={props.games} season={props.seasons[0]} user={props.user} /> </Col>		
					</Row>
				{  props.isAuthenticated && 
				    <Row>
					    <Col xs={6}><AddGame games={props.games} season={props.seasons[0]} user={props.user} /></Col>
					    <Col xs={6}><RunTheNumbers season={props.seasons[0]} /></Col>
				    </Row>
				}
				    <Row>
						<Col xs={6} md={4}><LatestResults season={props.seasons[0]} games={props.games} /></Col>
					    <Col xs={6} md={4}><TopFarms season={props.seasons[0]} games={props.games} /></Col>
					    <Col xs={6} md={4}><Streaks season={props.seasons[0]} games={props.games} /></Col>
						<Col xs={6} md={4}><MostPlayed season={props.seasons[0]} games={props.games} /></Col>
					    <Col xs={6} md={4}><LeastPlayed season={props.seasons[0]} games={props.games} /></Col>
				    </Row>
			    </>
		    }

		    { !seasons.length < 1 && isEmpty(seasons[0].players) &&
		    	<>
			    	<h2>No players have entered the season, be the first!</h2>
			    	<SeasonInfo games={props.games} season={props.seasons[0]} user={props.user} />
		    	</>
		    }

		    { seasons.length < 1 &&
		    	<>
			    	<h2>No seasons exist!</h2>
		    	</>
		    }
       	</div>
	);
}