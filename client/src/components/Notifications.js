import React, { useState, useEffect } from "react";
import { Glyphicon, Popover, Button, OverlayTrigger, Row, Col } from "react-bootstrap";
import Notification from "./Notification";
import "./Notifications.css";

export default function Notifications(props) {



  const popover = (
    <Popover id="popover" title="Notifications">

    { props.notifications.slice(0,10).map((notification, i) => {
        return <Notification key={i} message={notification.message}/>
    })}

      <Row>
        <Col xs={6}>
          <Button bsSize="small" disabled={false} block>
            All
          </Button>
        </Col>
        <Col xs={6}>
          <Button bsSize="small" disabled={false} block>
            Clear
          </Button>
        </Col>
      </Row>
    </Popover>
  );

  return (
    <div className="Notifications">

      <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
          <Glyphicon glyph="bell" />
      </OverlayTrigger>

    </div>
  );
}


