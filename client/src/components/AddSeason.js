import React, { useState, useEffect } from "react";
import { Form, FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { isEmpty, isOverlapping } from "../Utils"

import "./AddSeason.css";

export default function AddSeason(props) {

  const [fields, handleFieldChange] = useFormFields({
    name: "",
    start: "",
    end: ""
  });

  function seasonNameInUse(name, seasons){
    if(!isEmpty(seasons)){
      return seasons.some(season => season.name == fields.name)
    }
    
    return false
  }

  function validateForm() {
    return (

      fields.name.length > 0 &&
      fields.start !== "" &&
      fields.end !== "" &&
      new Date(fields.end) > new Date(fields.start) && 
      !seasonNameInUse(fields.name, props.seasons) &&
      !isOverlapping(fields, props.seasons)
    );
  }

  async function handleSubmit(event) {
    event.preventDefault();

    fields.players = [];

    try {

      fetch('/api/seasons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      })
      
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="AddSeason">
      <p><b>Create a Season</b></p>

      <Form onSubmit={handleSubmit}>

        <FormGroup controlId="name">
          <ControlLabel>Name</ControlLabel>
          <FormControl
            placeholder="Name"
            value={fields.name}
            onChange={handleFieldChange}
          />
        </FormGroup>

        <FormGroup controlId="start">
          <ControlLabel>Start</ControlLabel>
          <FormControl
            type="date"
            value={fields.start}
            onChange={handleFieldChange}
          />
        </FormGroup>

        <FormGroup controlId="end">
          <ControlLabel>End</ControlLabel>
          <FormControl
            type="date"
            value={fields.end}
            onChange={handleFieldChange}
          />
        </FormGroup>
        
        <Button
          type="submit"
          disabled={!validateForm()}
        >
          Add
        </Button>
      </Form>
      
    </div>
  );
}