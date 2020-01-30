import React, { useState } from "react";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import "./Settings.css";

export default function Signup(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [fields, handleFieldChange] = useFormFields({
    name: props.user.name
  });

  function validateForm() {
    return (
      fields.name.length > 0 &&
      fields.name.match(/(.|\s)*\S(.|\s)*/g)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
      fetch('/api/users/update', {
        credentials: 'include',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: fields.name }),

      }).then(response =>{
      	setIsLoading(false)
      })

      
    } catch (e) {
      alert(e.message);
      setIsLoading(false)
    }

  }

  return (
    <div className="Settings">
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