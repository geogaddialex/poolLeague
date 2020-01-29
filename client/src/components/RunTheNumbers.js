import React , {useEffect, useState} from "react";
import { Form, FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { isEmpty } from "../Utils"
import "./RunTheNumbers.css";

export default function RunTheNumbers(props) {


  function updateRTN(index, newValue){
    const updatedArray = [...props.RunTheNumbers];
    updatedArray[index] = newValue;
    props.setRunTheNumbers(updatedArray)
  }

{/*
There are at least a couple of ways to send the index into your function. Here’s one
  {this.props.inputs.map((input, index) => <input type = "text" key={input}  placeholder='Enter something here' onChange={e => this.props.onChange(index, e.target.value)}/>)}
https://www.freecodecamp.org/forum/t/reactjs-updating-an-array-with-multiple-dynamic-form-fields/191309/5
*/}

  const [fields, handleFieldChange] = useFormFields([
  {
    winner: "select",
    loser: "select",
    special: "None"
  },
  {
    winner: "select",
    loser: "select",
    special: "None"
  },
  {
    winner: "select",
    loser: "select",
    special: "None"
  },
  {
    winner: "select",
    loser: "select",
    special: "None"
  },
  {
    winner: "select",
    loser: "select",
    special: "None"
  }
  ]);

  return (
    <div className="RunTheNumbers">
        <p><b>Run the Numbers</b></p>

        { [1, 2, 3, 4, 5].map((number, index) => { return (

            <Form inline key={index}>

              <FormGroup controlId="winner">
                <FormControl componentClass="select" value={fields[index].winner} onChange={updateRTN}>
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
                <FormControl componentClass="select" value={fields[index].loser} onChange={updateRTN}>
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
                <FormControl componentClass="select" value={fields[index].special} onChange={updateRTN}>
                  <option key="0" value="Special">Special</option>
                  <option key="1" value="Foul Win">Foul Win</option>
                  <option key="2" value="Seven Ball">Seven Ball</option>
                </FormControl>
              </FormGroup>

            </Form>
        )})}
        
    </div>
  );
}