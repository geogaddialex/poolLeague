import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Settings.css";

export default function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    name: props.user.name
  });

  function validateForm() {
    return (
      fields.name.length > 0 &&
      fields.name.match(/(.|\s)*\S(.|\s)*/g) &&
      fields.name !== props.user.name
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setSuccess(false)
    setFailure(false)

    try {

      const response = await fetch('/api/users/update', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fields.name.trim() }),
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
    <div className="Settings">
    { success &&
      <Alert bsStyle="success">
        <strong>Success!</strong> User updated
      </Alert>
    }
    { failure && 
      <Alert bsStyle="danger">
        <strong>Failure!</strong> Couldn't update user
      </Alert>
    }
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="name" bsSize="large">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            autoFocus
            type="name"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </FormGroup>

          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
      </form>
     </div>
   );
}