import React, { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import "./AddGame.css";

export default function AddGame(props) {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fields, handleFieldChange] = useFormFields({
    winner: "select",
    loser: "select",
    special: "none",
  });

  useEffect(() => {
    async function onLoad() {

      loadUsers()
    }

    onLoad();
  }, [props.isAuthenticated]);

  async function loadUsers() {
    fetch('/api/users').then(function(response){

      response.json().then(responseUsers =>{
        setUsers(responseUsers)
        setIsLoading(false)
      })
      
    })
  }

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

      fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="AddGame">

      { !isLoading &&
        <Form inline onSubmit={handleSubmit}>

          <FormGroup controlId="winner">
            <ControlLabel>Winner</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="Select"
              value={fields.winner}
              onChange={handleFieldChange}
            >
              <option key="0" value="select" disabled>Select</option>
              {
                users.map((user, index) => {
                  return (
                    <option key={index+1} value={user._id}>{user.name}</option>
                  )
                })
              }
            </FormControl>
          </FormGroup>

          <FormGroup controlId="loser">
            <ControlLabel>Loser</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="Select"
              value={fields.loser}
              onChange={handleFieldChange}
            >
              <option key="0" value="select" disabled>Select</option>
              {
                users.map((user, index) => {
                  return (
                    <option key={index+1} value={user._id}>{user.name}</option>
                  )
                })
              }
            </FormControl>
          </FormGroup>

          <FormGroup controlId="special">
            <ControlLabel>Special</ControlLabel>
            <FormControl
              componentClass="select"
              placeholder="None"
              value={fields.special}
              onChange={handleFieldChange}
            >
              <option key="0" value="none">None</option>
              <option key="1" value="foul">Foul Win</option>
              <option key="2" value="seven">Seven Ball</option>
            </FormControl>
          </FormGroup>
          
          <Button
            type="submit"
            disabled={!validateForm()}
          >
            Add
          </Button>
        </Form>
      }
     </div>
  );
}