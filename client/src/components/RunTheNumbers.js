import React , {useEffect, useState} from "react";
import { Form, FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { useFormFields } from "../libs/hooksLib";
import { isEmpty } from "../Utils/Utils"
import "./RunTheNumbers.css";

export default function RunTheNumbers(props) {


  function updateRTN(index, e){

    const newValue = e.target.value
    const field = e.target.id

    const newArray = props.runTheNumbers.map((game, rtnIndex)=>{
      if(index == rtnIndex){

        switch(field) {
          case "winner":
            game.winner = newValue
            break;
          case "loser":
            game.loser = newValue
            break;
          case "special":
            game.special = newValue
            break;
        }
      }
      return game
    })
    props.setRunTheNumbers(newArray)
  }

  function reset(){
    props.setRunTheNumbers([{
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
    ])
  }

  return (
    <div className="RunTheNumbers">
        <p><b>Run the Numbers</b></p>

        { props.runTheNumbers.map((game, index) => { return (

            <Form inline key={index}>

              <FormGroup controlId="winner">
                <FormControl componentClass="select" value={game.winner} onChange={(e) => updateRTN(index,e)}>
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
                <FormControl componentClass="select" value={game.loser} onChange={(e) => updateRTN(index,e)}>
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
                <FormControl componentClass="select" value={game.special} onChange={(e) => updateRTN(index,e)}>
                  <option key="0" value="Special">Special</option>
                  <option key="1" value="Foul Win">Foul Win</option>
                  <option key="2" value="7 Ball">7 Ball</option>
                </FormControl>
              </FormGroup>


            </Form>
        )})}

        <Button onClick={reset}>Reset</Button>
    </div>
  );
}