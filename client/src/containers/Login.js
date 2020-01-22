import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Login.css";

export default function Login(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    name: "",
    password: ""
  });

  function validateForm() {
    return fields.name.length > 0 && fields.password.length > 0;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {

      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fields.name, password: fields.password }),
      })

      if(await response.ok){

        response.json().then(data => {
          var token = data.user
        });
        props.userHasAuthenticated(true)

      }else{
        setIsLoading(false);
      }
      
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="Login">
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
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </form>
    </div>
  );
}