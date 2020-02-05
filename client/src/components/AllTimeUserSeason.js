import React, { useState, useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";
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
import CountPlayed from "../components/CountPlayed";
import { isEmpty, isSeasonOpen } from "../Utils";
import "./AllTimeUserSeason.css";

export default function AllTimeUserSeason(props) {

	const numberOfResults = 10;

	function userPlayedIn(game){
		return game.winner._id == props.player || game.loser._id == props.player
	}

  	return (
    	<span className="AllTimeUserSeason">
			<Row> 
				<Col xs={12} sm={8} md={9}> 
					{ !isEmpty(props.users) &&

					<>
						<Row>
							<Col xs={12}>
								<CountPlayed user={props.user} player={props.player} players={props.users} games={props.games.filter(x=> userPlayedIn(x))} />
							</Col>
						</Row>
						
						{ props.games.length > 0 &&
							<Row>
								<Col xs={12}>
									<LatestResults user={props.user} limit={200} games={props.games.filter(x=> userPlayedIn(x))} />
								</Col>
							</Row>
						}

	    			</>
	    			}
				</Col>

				<Col xs={12} sm={4} md={3}>

					{ props.games.length > 0 && 
						<Row>
							<Col xs={12}><MostPlayed user={props.user} limit={numberOfResults} games={props.games.filter(x=> userPlayedIn(x))} /></Col>
						</Row>
					}

				</Col>		
			</Row>
    
    </span>
  );
}