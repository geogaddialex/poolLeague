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
import { isEmpty } from "../Utils/Utils";
import * as SeasonUtils from "../Utils/SeasonUtils";
import * as UserUtils from "../Utils/UserUtils";
import "./UserSeason.css";

export default function UserSeason(props) {

	const numberOfResults = 10;
	var player = UserUtils.getUser(props.player, props.users)

  	return (
    	<span className="UserSeason">
			<Row> 
				<Col xs={12} sm={8} md={9}> 
					{ !isEmpty(props.season.players) && SeasonUtils.hasSeasonStarted(props.season) &&

					<>
						<Row>
							<Col xs={12}>
								<UserLeagueRow users={props.users} user={props.user} player={player} games={props.games} season={props.season}/>
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								<CountPlayed user={props.user} player={props.player} players={props.season.players} games={props.games.filter(game=> UserUtils.userPlayed(game, player))} />
							</Col>
						</Row>
						
						{ props.playerGames.length > 0 &&
							<Row>
								<Col xs={12}>
									<LatestResults user={props.user} limit={10} games={props.playerGames} />
								</Col>
							</Row>
						}

	    			</>
	    			}
    				{ !SeasonUtils.hasSeasonStarted(props.season) &&
    					<Alert bsStyle="info">
							{props.season.name} hasn't started yet
						</Alert>
    				}
				</Col>

				<Col xs={12} sm={4} md={3}>

				    <Row>	
				    	<Col xs={12}><SeasonInfo games={props.playerGames} season={props.season} user={props.user} /></Col>
					</Row>
					{ props.playerGames.filter(game=> UserUtils.userPlayed(game, player)).length > 0 && 
						<Row>
							<Col xs={12}><MostPlayed user={props.user} limit={numberOfResults} games={props.playerGames} /></Col>
						</Row>
					}

				</Col>		
			</Row>
    
    </span>
  );
}