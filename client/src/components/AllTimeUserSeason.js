import React, { useState, useEffect } from "react";
import { Row, Col, Alert } from "react-bootstrap";
import LatestResults from "../components/LatestResults";
import MostPlayed from "../components/MostPlayed";
import LeastPlayed from "../components/LeastPlayed";
import CountPlayed from "../components/CountPlayed";
import UserStats from "../components/UserStats";
import AllTimeUserLeagueRow from "../components/AllTimeUserLeagueRow";
import { isEmpty } from "../Utils/Utils";
import { userPlayed, getUser } from "../Utils/UserUtils";
import { allTimeSeason } from "../Utils/SeasonUtils";
import "./AllTimeUserSeason.css";

export default function AllTimeUserSeason(props) {

	const numberOfResults = 10;
	var player = getUser(props.player, props.users)

  	return (
    	<span className="AllTimeUserSeason">
			<Row> 
				<Col xs={12} sm={8} md={9}> 
					{ !isEmpty(props.users) &&

					<>

						<Row>
							<Col xs={12}>
								<AllTimeUserLeagueRow users={props.users} user={props.user} player={player} games={props.games} />
							</Col>
						</Row>
						<Row>
							<Col xs={12}>
								<CountPlayed user={props.user} player={props.player} players={props.users} games={props.games.filter(game=> userPlayed(game, player))} />
							</Col>
						</Row>
						
						{ props.games.filter(game=> userPlayed(game, props.player)).length > 0 &&
							<Row>
								<Col xs={12}>
									<LatestResults user={props.user} limit={20} games={props.games.filter(game=> userPlayed(game, player))} />
								</Col>
							</Row>
						}

	    			</>
	    			}
				</Col>

				<Col xs={12} sm={4} md={3}>

				 	<Row>	
				    	<Col xs={12}><UserStats games={props.games.filter(game=> userPlayed(game, player))} player={props.player} users={props.users} user={props.user} seasons={props.seasons} /></Col>
					</Row>

					{ props.games.filter(game=> userPlayed(game, player)).length > 0 &&
						<Row>
							<Col xs={12}><MostPlayed user={props.user} limit={numberOfResults} games={props.games.filter(game=> userPlayed(game, player))} /></Col>
						</Row>
					}

				</Col>		
			</Row>
    
    </span>
  );
}