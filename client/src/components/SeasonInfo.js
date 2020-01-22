import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import getMinGames from "../Utils";
import "./SeasonInfo.css";

export default function SeasonInfo(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  

    if(props.games.length > 0 && props.season){
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
          <p>{props.season.name}</p>
          <p>Start: {formatDate(props.season.start)}</p>
          <p>End: {formatDate(props.season.end)}</p>
          <p>Total Games: {props.games.length}</p>
          <p>Min Games: {getMinGames(props.season)}</p>
        </>
        
      }
    </div>

  );
}