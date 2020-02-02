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
import { isEmpty, isSeasonOpen } from "../Utils";
import "./Season.css";

export default function Season(props) {

	const [runTheNumbers, setRunTheNumbers] = useState([{
	      winner: "select",
	      loser: "select",
	      special: "None"
	    },
	    {
	      winner: "select",
	      loser: "select",
	      special: "None"
	    },
	    {
	      winner: "select",
	      loser: "select",
	      special: "None"
	    },
	    {
	      winner: "select",
	      loser: "select",
	      special: "None"
	    },
	    {
	      winner: "select",
	      loser: "select",
	      special: "None"
	    }
    ])
	const numberOfResults = 10;

	function userInSeason(){
		return props.season.players.some(player => player._id == props.user._id)
	}

  	return (
    	<span className="Season">
			<Row> 
				<Col xs={12} sm={9}> 
					{ !isEmpty(props.season.players) &&

					<>
						<Row>
							<LeagueTable user={props.user} games={props.games} season={props.season} runTheNumbers={runTheNumbers} />
						</Row>
						
						{  !isEmpty(props.user) && userInSeason(props.user) && isSeasonOpen(props.season) && props.season.players.length > 1 &&
							<Row>
								<Col xs={12} md={6}><AddGame games={props.games} season={props.season} user={props.user} /></Col>
								<Col xs={12} md={6}><RunTheNumbers season={props.season} runTheNumbers={runTheNumbers} setRunTheNumbers={setRunTheNumbers} /></Col>
							</Row>
						}
						
						{ props.games.length > 1 &&
							<Row>
								<LatestResults user={props.user} limit={50} season={props.season} games={props.games} />
							</Row>
						}

						{ props.season.players.length == 1 &&
							<Row> 
								<Alert bsStyle="info">
									Waiting for more players
								</Alert>
							</Row>
	    				}
	    			</>
	    			}
    				{ !isSeasonOpen(props.season) && new Date(props.season.start) > new Date() &&
    					<Alert bsStyle="info">
							Season hasn't started yet
						</Alert>
    				}
				</Col>

				<Col xs={12} sm={3}>

					{ isSeasonOpen(props.season) && isEmpty(props.season.players) &&
				    	<h3>No players have entered the season, be the first!</h3>
				    }
				    	
				    <SeasonInfo games={props.games} season={props.season} user={props.user} />

					{ props.games.length > 0 && 
						<Row>
							<Col><Streaks user={props.user} season={props.season} games={props.games} /></Col>
							<Col><TopFarms user={props.user} limit={numberOfResults} season={props.season} games={props.games} /></Col>
							<Col><MostPlayed user={props.user} limit={numberOfResults} season={props.season} games={props.games} /></Col>
						    <Col><LeastPlayed user={props.user} limit={numberOfResults} season={props.season} games={props.games} /></Col>
						</Row> 
					}


				</Col>		
			</Row>
    
    </span>
  );
}