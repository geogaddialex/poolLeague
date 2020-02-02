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
import { isEmpty, isSeasonOpen } from "../Utils";
import "./All.css";

export default function Home(props) {

  	return (
	    <div className="All">

		{ !isEmpty(props.games) && props.games.length > 0 ?

			<Season user={props.user} games={props.games} />
		:

		    <Alert bsStyle="info">
				No games played
			</Alert>
		} 
       	</div>
	);
}