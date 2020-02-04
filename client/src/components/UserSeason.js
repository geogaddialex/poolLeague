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
import "./UserSeason.css";

export default function UserSeason(props) {

	const numberOfResults = 10;

	function userPlayedIn(game){
		return game.winner._id == props.user._id || game.loser._id == props.user._id
	}

  	return (
    	<span className="UserSeason">
			<Row> 
				<Col xs={12} sm={8} md={9}> 
					{ !isEmpty(props.season.players) &&

					<>
						<Row>
							<Col xs={12}>
								<CountPlayed user={props.user} player={props.user._id} season={props.season} games={props.games.filter(x=> userPlayedIn(x))} />
							</Col>
						</Row>
						
						{ props.games.length > 0 &&
							<Row>
								<Col xs={12}>
									<LatestResults user={props.user} limit={200} season={props.season} games={props.games} />
								</Col>
							</Row>
						}

	    			</>
	    			}
    				{ !isSeasonOpen(props.season) && new Date(props.season.start) > new Date() &&
    					<Alert bsStyle="info">
							{props.season.name} hasn't started yet
						</Alert>
    				}
				</Col>

				<Col xs={12} sm={4} md={3}>

				    <Row>	
				    	<Col xs={12}><SeasonInfo games={props.games} season={props.season} user={props.user} /></Col>
					</Row>
					{ props.games.length > 0 && 
						<Row>
							<Col xs={12}><MostPlayed user={props.user} limit={numberOfResults} season={props.season} games={props.games} /></Col>
						</Row>
					}

				</Col>		
			</Row>
    
    </span>
  );
}