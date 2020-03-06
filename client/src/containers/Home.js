import React, { useState, useEffect } from "react";
import { Row, Col, Tabs, Tab, Alert } from "react-bootstrap";
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
import * as Utils from "../Utils/Utils";
import * as SeasonUtils from "../Utils/SeasonUtils";
import "./Home.css";

export default function Home(props) {

	const [key, setKey] = useState()

  	return (
	    <div className="Home">

		{ !Utils.isEmpty(props.seasons) && props.seasons.length > 0 ?

			<Tabs activeKey={key} defaultActiveKey={SeasonUtils.getCurrentSeasonIndex(props.seasons)} id="tabs">

			{
				props.seasons.sort(SeasonUtils.startedEarliest).map((season, index) => {

					const gamesForSeason = SeasonUtils.getGamesForSeason(props.games, season)

					return (
			        	<Tab key={index} eventKey={index} title={season.name}>
			          		<Season key={index} user={props.user} seasons={props.seasons} games={gamesForSeason} minGames={SeasonUtils.getMinGames(season)} allGames={props.games} season={season} />
			        	</Tab>
			    	)
				})
			}
			
			</Tabs>
		:
			<>
				<Alert bsStyle="info">
		    		No seasons exist!
		    	</Alert>

		    	{ !Utils.isEmpty(props.user) &&
		    		<AddSeason seasons={props.seasons} />
		    	}
			</>
		} 
       	</div>
	);
}