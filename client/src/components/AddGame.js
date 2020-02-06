import React , {useEffect, useState} from "react";
import { Form, FormGroup, FormControl, ControlLabel, Button, Alert } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { isEmpty } from "../Utils/Utils"
import "./AddGame.css";

export default function AddGame(props) {

  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    setSuccess(false)
    setFailure(false)

    try {

      fields.addedBy = props.user
      const response = await fetch('/api/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })

      if(await response.ok){  

        setIsLoading(false)
        setSuccess(true)
      }else{

        setFailure(true)
        setIsLoading(false);
      }
      
    } catch (e) {
      setFailure(true)
      setIsLoading(false);
    }
  }

  return (
    <div className="AddGame">

      { success &&
        <Alert bsStyle="success">
          <strong>Success!</strong> Game added
        </Alert>
      }
      { failure && 
        <Alert bsStyle="danger">
          <strong>Failure!</strong> Couldn't add game
        </Alert>
      }
      { !failure && !success &&
        <p><b>Add a Game</b></p>
      }

      <Form onSubmit={handleSubmit}>

        <FormGroup controlId="winner">
          <FormControl
            componentClass="select"
            value={fields.winner}
            onChange={handleFieldChange}
          >
            <option key="0" value="select" disabled>Winner</option>
            {
              props.season.players.sort((a, b) => a.name.localeCompare(b.name)).map((user, index) => {
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

          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Add
          </LoaderButton>        
      </Form>
    </div>
  );
}