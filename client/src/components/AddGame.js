import React , {useEffect, useState} from "react";
import { Form, FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import "./AddGame.css";

export default function AddGame(props) {

  const [season, setSeason] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {  

    if(props.season !== undefined){
      setSeason(props.season)
      setIsLoading(false)
    }

  }, [props.season]);

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

      {!isLoading &&

        <Form inline onSubmit={handleSubmit}>

          <FormGroup controlId="winner">
            <FormControl
              componentClass="select"
              value={fields.winner}
              onChange={handleFieldChange}
            >
              <option key="0" value="select" disabled>Winner</option>
              {
                season.players.map((user, index) => {
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
                season.players.map((user, index) => {
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
              <option key="2" value="Seven Ball">Seven Ball</option>
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