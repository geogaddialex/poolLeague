import React from "react";
import { Button, Glyphicon } from "react-bootstrap";
import "./JoinSeason.css";

export default function JoinSeason({
  isLoading,
  className = "",
  disabled = false,
  ...props
}) {

  async function joinSeason() {
    fetch('/api/seasons/join', {
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ season: props.season, user: props.user })

    }).then(function(response){

        response.json().then(responseJson =>{
         
          //green bootstrap alert

        })
    })
  }
  
  return (
    <Button
      onClick={joinSeason}
      className={`JoinSeason ${className}`}
      {...props}
    >
      {isLoading && <Glyphicon glyph="refresh" className="spinning" />}
      {props.children}
    </Button>
  );
}