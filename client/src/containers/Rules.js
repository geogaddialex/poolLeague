import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap"
import Rule from "../components/Rule";
import "./Rules.css";

export default function Rules(props) {

	const rules = [
		"Players should play each other at least once, any unplayed games count as losses.",
		"Players get one loss for each game under the minimum required (which increases as the season progresses).",
		"If the black ball is potted on the break, re-rack."
	]

  	return (
	    <div className="Rules">
	    	<h3>Rules</h3>
	    	{ rules.map( rule =>{
	    		return( <Rule rule={rule} /> )
	    	})}	
	    	<Alert className="newRule" bsStyle="success">Anyone can suggest a new rule, make a <a href="https://www.strawpoll.me">Strawpoll</a> and if it's popular, it will be implemented (PoolLeague voting coming soon)</Alert>
       	</div>
	);
}