import React, { useState, useEffect } from "react";
import LeagueTable from "../components/LeagueTable";
import AddGame from "../components/AddGame";
import TopFarms from "../components/TopFarms";
import MostPlayed from "../components/MostPlayed";
import LeastPlayed from "../components/LeastPlayed";
import "./Home.css";

export default function Home(props) {
	const [users, setUsers] = useState([]);
  	const [games, setGames] = useState([]);
  	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
	  async function onLoad() {

	    Promise.all([loadUsers(), loadGames()]).then(values => {
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

  	return (
	    <div className="Home">
	    	{ !isLoading && 
	    		<React.Fragment>
					<LeagueTable users={users} games={games}/>
				    <AddGame users={users} games={games}/>
				    <TopFarms users={users} games={games}/>
				    <MostPlayed users={users} games={games}/>
				    <LeastPlayed users={users} games={games}/>
			    </React.Fragment>
			}
       	</div>
	);
}