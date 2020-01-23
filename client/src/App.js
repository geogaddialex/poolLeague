import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import "./App.css";

function App(props) {

  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState({})

  useEffect(() => {
    async function onLoad() {

      Promise.all([getStatus()]).then(values => {
        setIsAuthenticating(false)
      })

      if(isAuthenticated){
        Promise.all([loadUser()]).then(values => {

        })
      }
    }

    onLoad();
  }, [isAuthenticated]);

  async function getStatus() {
    fetch('/api/auth/status', {credentials: 'same-origin'}).then(function(response){

      response.json().then(responseJson =>{

        if(responseJson.authenticated){
            userHasAuthenticated(true);
        }else{
          console.log("getStatus responseJson = " + JSON.stringify(responseJson))
        }

      })
      
    })
  }

  async function loadUser() {

    fetch('/api/auth/user', {credentials: 'same-origin'}).then(function(response){

      response.json().then(responseUser =>{
        setUser(responseUser)
        return responseUser
      })
      
    })
  }

  function handleLogout() {
    fetch('/api/auth/logout', {credentials: 'same-origin'}).then(function(response){
      
      if(response.ok){
        userHasAuthenticated(false);
      }else{
        console.log("FAILURE: Logging out")
      }

    })
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Netsol Pool League</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>

            {isAuthenticated
              ? <>
                  <LinkContainer to="/user">
                    <NavItem>Me</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <NavItem>Settings</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/admin">
                    <NavItem>Admin</NavItem>
                  </LinkContainer>
                  <NavItem onClick={handleLogout}>Logout</NavItem>
              </>
              : <>
                  <LinkContainer to="/signup">
                    <NavItem>Signup</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </>
            }

          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes appProps={{ isAuthenticated, userHasAuthenticated, user }} />

    </div>
  );
}

export default withRouter(App);