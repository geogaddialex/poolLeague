import React from "react";
import "./NotFound.css";
import { Alert } from "react-bootstrap"; 

export default function NotFound() {
  return (
    <div className="NotFound">
    	<Alert bsStyle="info">
      		Sorry, page not found!
      	</Alert>
    </div>
  );
}