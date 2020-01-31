import React , {useEffect, useState} from "react";
import { Form, FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { isEmpty } from "../Utils"
import "./AddGame.css";

export default function AddGame(props) {

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

  async function handleSubmit(event) {
    event.preventDefault();

    try {

      fields.addedBy = props.user
      fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      
    } catch (e) {

    }
  }

  return (
    <div className="AddGame">
      <p><b>Add a Game</b></p>

      <Form onSubmit={handleSubmit}>

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
            <option key="0" value="None">Special</option>
            <option key="1" value="Foul Win">Foul Win</option>
            <option key="2" value="7 Ball">7 Ball</option>
          </FormControl>
        </FormGroup>
        
        <Button type="submit" disabled={!validateForm()}>Add</Button>
      </Form>
    </div>
  );
}