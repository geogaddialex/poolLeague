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
  	const [games, setGames] = useState([]);
  	const [seasons, setSeasons] = useState([]);
  	const [user, setUser] = useState({});

	useEffect(() => {

		setUser(props.user)
		setGames(props.games)
		setSeasons(props.seasons)

	});


	function userInSeason(){
		return props.seasons[0].players.some(player => player._id == user._id)
	}

  	return (
	    <div className="Home">

		    { seasons.length > 0 && !isEmpty(seasons[0].players) &&

	    		<>
	    			<Row> 
						<Col xs={9} md={10}> 
							<Row><Col xs={12}><LeagueTable games={props.games} season={props.seasons[0]} /></Col></Row>
							{  !isEmpty(user) && userInSeason(user) &&
								<Row>      
								    <Col xs={12} md={6}><AddGame games={props.games} season={props.seasons[0]} user={props.user} /></Col>
								    <Col xs={12} md={6}><RunTheNumbers season={props.seasons[0]} /></Col>
							    </Row>
							}
							{ games.length > 0 ?
								<Row>
									<Col xs={6} md={3}><LatestResults season={props.seasons[0]} games={props.games} /></Col>
								    <Col xs={6} md={3}><TopFarms season={props.seasons[0]} games={props.games} /></Col>
									<Col xs={6} md={3}><MostPlayed season={props.seasons[0]} games={props.games} /></Col>
								    <Col xs={6} md={3}><LeastPlayed season={props.seasons[0]} games={props.games} /></Col>
							    </Row>
							:
							    <h2> No games played </h2>
							}
						</Col>
						<Col xs={3} md={2}>
							<Row><Col xs={12}><SeasonInfo games={props.games} season={props.seasons[0]} user={props.user} /></Col></Row>
							{ games.length > 0 && <Row><Col xs={12}><Streaks season={props.seasons[0]} games={props.games} /></Col></Row> }
						</Col>		
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
			    	<AddSeason />
		    	</>
		    }
       	</div>
	);
}