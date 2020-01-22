import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import LeagueTable from "../components/LeagueTable";
import AddGame from "../components/AddGame";
import LastFive from "../components/LastFive";
import TopFarms from "../components/TopFarms";
import MostPlayed from "../components/MostPlayed";
import LeastPlayed from "../components/LeastPlayed";
import Streaks from "../components/Streaks";
import SeasonInfo from "../components/SeasonInfo";
import RunTheNumbers from "../components/RunTheNumbers";
import "./Home.css";

export default function Home(props) {
	const [users, setUsers] = useState([]);
  	const [games, setGames] = useState([]);
  	const [seasons, setSeasons] = useState([]);
  	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
	  async function onLoad() {

	    Promise.all([loadUsers(), loadGames(), loadSeasons()]).then(values => {
    		setIsLoading(false)
    	})
	  }

	  onLoad();
	}, [props.isAuthenticated]);

	async function loadUsers() {
	    fetch('/api/users').then(function(response){

	      response.json().then(responseUsers =>{
	        setUsers(responseUsers)
	        return responseUsers
	      })
	      
	    })
	}

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
						<Col xs={10}><LeagueTable users={users} games={games} season={seasons[0]}/></Col>
						<Col xs={2}><SeasonInfo games={games} season={seasons[0]} /></Col>					    

					</Row>

					{ props.isAuthenticated &&
				    <Row>
					    <Col xs={6}><AddGame users={users} games={games} season={seasons[0]}/></Col>
					    <Col xs={6}><RunTheNumbers users={users} /></Col>
				    </Row>
					}

				    <Row>
				    	
						<Col xs={6} md={4}><LastFive users={users} games={games} /></Col>
					    <Col xs={6} md={4}><TopFarms users={users} games={games} /></Col>
					    <Col xs={6} md={4}><Streaks users={users} games={games} /></Col>
						<Col xs={6} md={4}><MostPlayed users={users} games={games} /></Col>
					    <Col xs={6} md={4}><LeastPlayed users={users} games={games} /></Col>
				    </Row>
				    
			    </React.Fragment>
			}
       	</div>
	);
}