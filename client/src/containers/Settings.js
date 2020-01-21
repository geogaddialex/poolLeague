import React, { useState, useEffect } from "react";
import "./Settings.css";

export default function Settings(props) {
  	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {

		setIsLoading(false)

	}, [props.isAuthenticated]);

  	return (
	    <div className="Settings">
	    	{ !isLoading && 
	    		<>

			    </>
			}
       	</div>
	);
}