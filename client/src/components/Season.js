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
				<Col xs={12} sm={8} md={9}> 
					{ !isEmpty(props.season.players) &&

					<>
						<Row>
							<Col xs={12}>
								<LeagueTable user={props.user} games={props.games} season={props.season} runTheNumbers={runTheNumbers} />
							</Col>
						</Row>
						
						{  !isEmpty(props.user) && userInSeason(props.user) && isSeasonOpen(props.season) && props.season.players.length > 1 &&
							<Row>
								<Col xs={12} md={4}><AddGame games={props.games} season={props.season} user={props.user} /></Col>
								<Col xs={12} md={8}><RunTheNumbers season={props.season} runTheNumbers={runTheNumbers} setRunTheNumbers={setRunTheNumbers} /></Col>
							</Row>
						}
						
						{ props.games.length > 0 &&
							<Row>
								<Col xs={12}>
									<LatestResults user={props.user} limit={50} season={props.season} games={props.games} />
								</Col>
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
							{props.season.name} hasn't started yet
						</Alert>
    				}
				</Col>

				<Col xs={12} sm={4} md={3}>

					{ isSeasonOpen(props.season) && isEmpty(props.season.players) &&
						<Alert bsStyle="info">
				    		No players have entered the season, be the first!
				    	</Alert>
				    }
				    <Row>	
				    	<Col xs={12}><SeasonInfo games={props.games} season={props.season} user={props.user} /></Col>
					</Row>
					{ props.games.length > 0 && 
						<Row>

							{ isSeasonOpen(props.season) &&
								<Col xs={12}><Streaks user={props.user} season={props.season} games={props.games} /></Col>
							}
							<Col xs={12}><TopFarms user={props.user} limit={numberOfResults} season={props.season} games={props.games} /></Col>
							<Col xs={12}><MostPlayed user={props.user} limit={numberOfResults} season={props.season} games={props.games} /></Col>
							<Col xs={12}><LeastPlayed user={props.user} limit={numberOfResults} players={props.season.players} games={props.games} /></Col>
						</Row>

					}

				</Col>		
			</Row>
    
    </span>
  );
}