import React, { useState, useEffect } from "react";
import AddSeason from "../components/AddSeason";
import AdminAddGame from "../components/AdminAddGame";

import "./Admin.css";

export default function Admin(props) {
  	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {

		setIsLoading(false)

	}, [props.isAuthenticated]);

  	return (
	    <div className="Admin">
	    	{ !isLoading && 
	    		<>
	    			<AddSeason seasons={props.seasons} />
	    			<br/>
	    			<AdminAddGame user={props.user} users={props.users} />
	    		</>
			}
       	</div>
	);
}