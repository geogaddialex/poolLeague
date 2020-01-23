import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { getMinGames, isEmpty } from "../Utils";
import JoinSeason from "../components/JoinSeason";
import "./SeasonInfo.css";

export default function SeasonInfo(props) {
  const [games, setGames] = useState([]);
  const [season, setSeason] = useState({});
  const [user, setUser] = useState({});

  useEffect(() => {  

      setSeason(props.season)
      setUser(props.user)
      setGames(props.games)

  }, [props.games, props.season, props.user]);

  function formatDate(dateString){
    var date = new Date(dateString)
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  }

  function userInSeason(){
    return season.players.some(player => player._id == user._id)
  }

  return (

    <div className="SeasonInfo">
      { !isEmpty(season) &&

        <>
          <p>{season.name}</p>
          <p>Start: {formatDate(season.start)}</p>
          <p>End: {formatDate(season.end)}</p>

          { !isEmpty(season.players) &&
            <>
              <p>Total Games: { games.length }</p>
              <p>Min Games: {getMinGames(season)}</p>
            </>
          }
          
        </>
        
      }

      { !isEmpty(user) && !userInSeason(user) &&
        <JoinSeason
          block
          type="submit"
          bsSize="large"
          user={user}
          season={season}
        >Join</JoinSeason>
      }
     
    </div>

  );
}