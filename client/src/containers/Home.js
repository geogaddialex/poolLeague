import React, { useState, useEffect } from "react";
import LeagueTable from "../components/LeagueTable";
import AddGame from "../components/AddGame";
import "./Home.css";

export default function Home(props) {
  	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
	  async function onLoad() {

	    setIsLoading(false);
	  }

	  onLoad();
	}, [props.isAuthenticated]);

  	return (
	    <div className="Home">
	    	{ !isLoading && 
	    		<React.Fragment>
					<LeagueTable />
				    <AddGame />
			    </React.Fragment>
			}
       	</div>
	);
}