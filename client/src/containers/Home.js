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
  	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {

		async function onLoad() {

			if( !isEmpty(props.user) ){

				console.log("user = " + JSON.stringify(props.user))
				setUser(props.user)
			}

			Promise.all([loadGames(), loadSeasons()]).then(values => {
				setIsLoading(false)
			})
		}

		onLoad();
	}, [props.isAuthenticated, props.user]);

	async function loadGames() {
		fetch('/api/games').then(function(response){

		  response.json().then(responseGames =>{
		    setGames(responseGames)
		    return responseGames
		  })
		  
		})
	}

	async function loadSeasons() {
		fetch('/api/seasons').then(function(response){

		  response.json().then(responseSeasons =>{
		    setSeasons(responseSeasons)
		    return responseSeasons
		  })
		  
		})
	}

  	return (
	    <div className="Home">
	    	{ !isLoading && 
	    		<React.Fragment>

	    			<Row>
						<Col xs={10}><LeagueTable games={games} season={seasons[0]}/></Col>
						<Col xs={2}>
							<Row>
								<SeasonInfo games={games} season={seasons[0]} user={user} />
							</Row>
						</Col>					    
					</Row>

					{ props.isAuthenticated &&
				    <Row>
					    <Col xs={6}><AddGame games={games} season={seasons[0]} user={user} /></Col>
					    <Col xs={6}><RunTheNumbers season={seasons[0]} /></Col>
				    </Row>
					}

				    <Row>
				    	
						<Col xs={6} md={4}><LatestResults season={seasons[0]} games={games} /></Col>
					    <Col xs={6} md={4}><TopFarms season={seasons[0]} games={games} /></Col>
					    <Col xs={6} md={4}><Streaks season={seasons[0]} games={games} /></Col>
						<Col xs={6} md={4}><MostPlayed season={seasons[0]} games={games} /></Col>
					    <Col xs={6} md={4}><LeastPlayed season={seasons[0]} games={games} /></Col>
				    </Row>
				    
			    </React.Fragment>
			}
       	</div>
	);
}