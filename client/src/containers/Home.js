import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Tab } from "react-bootstrap";
import LeagueTable from "../components/LeagueTable";
import AddGame from "../components/AddGame";
import LatestResults from "../components/LatestResults";
import TopFarms from "../components/TopFarms";
import MostPlayed from "../components/MostPlayed";
import LeastPlayed from "../components/LeastPlayed";
import Streaks from "../components/Streaks";
import SeasonInfo from "../components/SeasonInfo";
import RunTheNumbers from "../components/RunTheNumbers";
import AddSeason from "../components/AddSeason";
import Season from "../components/Season"
import { isEmpty, isSeasonOpen, getGamesForSeason } from "../Utils";
import "./Home.css";

export default function Home(props) {

const [key, setKey] = useState()

  	return (
	    <div className="Home">

		{ !isEmpty(props.seasons) && props.seasons.length > 0 ?

			<Tabs activeKey={key} >

			{
				props.seasons.map((season, index) => {

					const gamesForSeason = getGamesForSeason(props.games, season)

						return (
				        	<Tab eventKey={index} title={season.name}>
				          		<Season key={index} user={props.user} games={gamesForSeason} season={season} />
				        	</Tab>
				    	)
					
			        
				})
			}
			</Tabs>				

		:

			<>
		    	<h3>No seasons exist!</h3>
		    	{ !isEmpty(props.user) &&
		    		<AddSeason seasons={props.seasons} />
		    	}
			</>
		} 
       	</div>
	);
}