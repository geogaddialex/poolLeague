import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Tab, Alert } from "react-bootstrap";
import AllTimeLeagueTable from "../components/AllTimeLeagueTable";
import TopFarms from "../components/TopFarms";
import MostPlayed from "../components/MostPlayed";
import LeastPlayed from "../components/LeastPlayed";
import { isEmpty, isSeasonOpen } from "../Utils/Utils";
import "./All.css";

export default function All(props) {

	const numberOfResults = 10

  	return (
	    <div className="All">

		{ !isEmpty(props.games) && props.games.length > 0 ?

			<Row> 
				<Col xs={12} sm={8} md={9}> 
					<Row>
						<Col xs={12}>
							<AllTimeLeagueTable user={props.user} games={props.games} players={props.users} />
						</Col>
					</Row>
				</Col>

				<Col xs={12} sm={4} md={3}>

					{ !isEmpty(props.games) && !isEmpty(props.users) &&
						<Row>
							<Col xs={12}><TopFarms user={props.user} limit={numberOfResults} games={props.games} /></Col>
							<Col xs={12}><MostPlayed user={props.user} limit={numberOfResults} games={props.games} /></Col>
						</Row>
					}

				</Col>		
			</Row>
		:
		    <Alert bsStyle="info">
				No games played
			</Alert>
		} 
       	</div>
	);
}