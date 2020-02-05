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
import UserLeagueRow from "../components/UserLeagueRow";
import { isEmpty, isSeasonOpen } from "../Utils";
import { userPlayed, getUser } from "../UserUtils";
import "./UserSeason.css";

export default function UserSeason(props) {

	const numberOfResults = 10;
	var player = getUser(props.player, props.users)

  	return (
    	<span className="UserSeason">
			<Row> 
				<Col xs={12} sm={8} md={9}> 
					{ !isEmpty(props.season.players) &&

					<>
						<Row>
							<Col xs={12}>
								<UserLeagueRow users={props.users} user={props.user} player={props.player} games={props.games} season={props.season}/>
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								<CountPlayed user={props.user} player={props.player} players={props.season.players} games={props.games.filter(game=> userPlayed(game, player))} />
							</Col>
						</Row>
						
						{ props.games.length > 0 &&
							<Row>
								<Col xs={12}>
									<LatestResults user={props.user} limit={200} games={props.games} />
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
					{ props.games.filter(game=> userPlayed(game, player)).length > 0 && 
						<Row>
							<Col xs={12}><MostPlayed user={props.user} limit={numberOfResults} games={props.games} /></Col>
						</Row>
					}

				</Col>		
			</Row>
    
    </span>
  );
}