import React, { useState, useEffect } from "react";
import { Glyphicon, Popover, Button, OverlayTrigger, Row, Col } from "react-bootstrap";
import "./Notification.css";

export default function Notification(props) {

  return (
    <div className="Notification">
      <span><Row>
      <Col xs={10}>{props.message}</Col>
      <Col xs={2} className="removeNotification"><Glyphicon glyph="remove"/></Col>
      </Row></span>
    </div>
  );
}


