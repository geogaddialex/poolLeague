import React, { useState, useEffect } from "react";
import AddSeason from "../components/AddSeason";

import "./Admin.css";

export default function Admin(props) {
  	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {

		setIsLoading(false)

	}, [props.isAuthenticated]);

  	return (
	    <div className="Settings">
	    	{ !isLoading && 
	    		<AddSeason />
			}
       	</div>
	);
}