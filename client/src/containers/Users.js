import React from "react";
import { Row, Col, Tabs, Tab, Alert, Button, Table } from "react-bootstrap";
import { isEmpty, myRow, formatDateAndTime } from "../Utils/Utils";
import "./Users.css";

export default function Users(props) {

  	async function deleteUser(id) {

  		alert("R U SURE?")

	    // fetch('/api/games/' + id, {
	    //   credentials: 'same-origin',
	    //   method: 'DELETE',
	    //   headers: { 'Content-Type': 'application/json' }
	    // }).then(function(response){
	    // 	alert("game deleted: " + id)
	    // })
  	}

  	return (
	    <div className="Users">
	    <h3>Users</h3>

		{ !isEmpty(props.users) && props.users.length > 0 ?

			<Table striped bordered condensed hover>
		        <thead>
		          <tr>
		            <th>Name</th>
		            <th>Delete</th>
		          </tr>
		        </thead>

		        <tbody>
		        {
		          props.users
		          .map((user, index) => {
		            return (
		              <tr key={user._id}>
		                <td>{user.name}</td>
		                <td>
					      <Button onClick={() => {deleteUser(user._id)}} bsSize="small">
					        Delete
					      </Button>
		                </td>
		              </tr>
		            )
		          })
		        }
		        </tbody>
	      
	      	</Table>
	  	:
	  		<Alert>No Users</Alert>
	  	}
       	</div>
	);
}