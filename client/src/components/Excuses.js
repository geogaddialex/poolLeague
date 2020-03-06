import React, { useState, useEffect } from "react";
import * as Utils from "../Utils/Utils"
import { Button, Glyphicon, Popover, OverlayTrigger, FormGroup, FormControl } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import Excuse from "./Excuse"
import "./Excuses.css";

export default function Excuses(props) {

  const [fields, handleFieldChange] = useFormFields({
    comment: ""
  });

  function validateForm() {
    return (
      fields.comment.length > 0 && fields.comment.length < 40 && fields.comment.match(/(.|\s)*\S(.|\s)*/g)
    );
  }

  async function addExcuse() {
    fetch('/api/games/addExcuse', {
      credentials: 'same-origin',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author: props.user, comment: fields.comment, game: props.game })

    }).then(function(response){

        response.json().then(responseJson =>{
          document.body.click()
        })
    })
  }

  function handleKeyPress(target){
      if(target.charCode==13){
        addExcuse()
      } 
  }

  const popover = (
    <Popover id="popover" title="Add a comment">
      <FormGroup controlId="comment">
        <FormControl
          type="text"
          value={fields.comment}
          onChange={handleFieldChange}
          onKeyPress={handleKeyPress}
        />
      </FormGroup>
      <Button onClick={addExcuse} bsSize="small" disabled={!validateForm()}>
        Add
      </Button>
    </Popover>
  );

  return (
    <div className="Excuses">

      { !Utils.isEmpty(props.game.excuses) && 
        props.game.excuses.map((excuse, index) => {
          
          return (
            <Excuse key={index} name={excuse.author.name} comment={excuse.comment} />
          )
        })
      }

      { !Utils.isEmpty(props.user) &&
        <span>
          <OverlayTrigger trigger="click" rootClose placement="bottom" overlay={popover}>
            <Button bsSize="small">
              <Glyphicon glyph="plus" />
            </Button>
          </OverlayTrigger>
        </span>
      }

    </div>
  );
}


