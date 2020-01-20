import React, { useState, useEffect } from "react";
import LeagueTable from "../components/LeagueTable";
import AddGame from "../components/AddGame";
import "./Home.css";

export default function Home(props) {
	const [seasons, setSeasons] = useState([]);
  	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
	  async function onLoad() {

{/*
	    if (!props.isAuthenticated) {
	      return;
	    }


	    try {
	      const seasons = await loadSeasons();
	      setSeasons(seasons);
	    } catch (e) {
	      alert(e);
	    }
*/}


	    setIsLoading(false);
	  }

	  onLoad();
	}, [props.isAuthenticated]);


	async function loadSeasons() {
		const response = await fetch('/api/seasons/')
		var seasonsResponse = []

		if(await response.ok){
			seasonsResponse = response
		}else{
			console.log("FAILURE: retrieving seasons")
		}
		return seasonsResponse
	}

  	return (
	    <div className="Home">
	    	{ !isLoading && 
	    		<React.Fragment>
					<LeagueTable
						season={seasons[0]}
				    />
				    <AddGame />
			    </React.Fragment>
			}
       	</div>
	);
}