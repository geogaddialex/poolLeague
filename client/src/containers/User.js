import React, { useState, useEffect } from "react";
import "./User.css";

export default function User(props) {
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
	    <div className="User">
	    	{ !isLoading && 
	    		<React.Fragment>

			    </React.Fragment>
			}
       	</div>
	);
}