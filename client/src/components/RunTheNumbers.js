import React , {useEffect, useState} from "react";
import { Form, FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { isEmpty } from "../Utils"
import "./RunTheNumbers.css";

export default function RunTheNumbers(props) {

  const [fields, handleFieldChange] = useFormFields({
    winner: "select",
    loser: "select",
    special: "None"
  });

  function validateForm() {
    return (
      fields.winner !== fields.loser &&
      fields.winner !== "select" &&
      fields.loser !== "select"
    );
  }

  return (
    <div className="RunTheNumbers">

        <Form inline>

          <FormGroup controlId="winner">
            <FormControl
              componentClass="select"
              value={fields.winner}
              onChange={handleFieldChange}
            >
              <option key="0" value="select" disabled>Winner</option>
              {
                props.season.players.map((user, index) => {
                  return (
                    <option key={index+1} value={user._id}>{user.name}</option>
                  )
                })
              }
            </FormControl>
          </FormGroup>

          <FormGroup controlId="loser">
            <FormControl
              componentClass="select"
              value={fields.loser}
              onChange={handleFieldChange}
            >
              <option key="0" value="select" disabled>Loser</option>
              {
                props.season.players.map((user, index) => {
                  return (
                    <option key={index+1} value={user._id}>{user.name}</option>
                  )
                })
              }
            </FormControl>
          </FormGroup>

          <FormGroup controlId="special">
            <FormControl
              componentClass="select"
              value={fields.special}
              onChange={handleFieldChange}
            >
              <option key="0" value="Special">Special</option>
              <option key="1" value="Foul Win">Foul Win</option>
              <option key="2" value="Seven Ball">Seven Ball</option>
            </FormControl>
          </FormGroup>
        
        </Form>
    </div>
  );
}