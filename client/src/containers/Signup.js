import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel, Alert } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Signup.css";

export default function Signup(props) {
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [failure, setFailure] = useState(false);

  function validateForm() {
    return (
      fields.name.length > 0 &&
      fields.name.match(/(.|\s)*\S(.|\s)*/g) &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    setFailure(false)

    try {

      const response = await fetch('/api/auth/signup', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fields.name.trim(), password: fields.password }),
      })

      if(await response.ok){  
        response.json().then(json => props.setUser(json))

      }else{
        setFailure(true)
        setIsLoading(false);
      }
      
    } catch (e) {
      setFailure(true)
    }
  }

  return (
    <div className="Signup">
    { failure &&
      <Alert bsStyle="danger">
        <strong>Failure!</strong> Couldn't sign up
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
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={fields.password}
            onChange={handleFieldChange}
          />
        </FormGroup>
        <FormGroup controlId="confirmPassword" bsSize="large">
          <ControlLabel>Confirm Password</ControlLabel>
          <FormControl
            type="password"
            onChange={handleFieldChange}
            value={fields.confirmPassword}
          />
        </FormGroup>  

          <LoaderButton
            block
            type="submit"
            bsSize="large"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Signup
          </LoaderButton>
      </form>
     </div>
   );
}