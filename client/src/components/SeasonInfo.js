import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import getMinGames from "../Utils";
import "./SeasonInfo.css";

export default function SeasonInfo(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [season, setSeason] = useState({});

  useEffect(() => {  

    if(props.season){
      setSeason(props.season)
    }

    if(props.games.length > 0 && props.season){
      setGames(props.games)
      setIsLoading(false)
    }

  }, [props.games, props.season]);

  function formatDate(dateString){
    var date = new Date(dateString)
    return date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear()
  }

  return (

    <div className="SeasonInfo">
      { !isLoading &&

        <>
          <p>{season.name}</p>
          <p>Start: {formatDate(season.start)}</p>
          <p>End: {formatDate(season.end)}</p>
          <p>Total Games: {games.length}</p>
          <p>Min Games: {getMinGames(season)}</p>
        </>
        
      }

      { isLoading && season &&
        <>
          <p>{season.name}</p>
          <p>Start: {formatDate(season.start)}</p>
          <p>End: {formatDate(season.end)}</p>
          <p>Total Games: 0</p>
          <p>Min Games: {getMinGames(season)}</p>
        </>
      }
    </div>

  );
}