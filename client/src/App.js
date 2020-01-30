import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Routes from "./Routes";
import { isEmpty } from "./Utils"
import io from "socket.io-client";
import "./App.css";

function App(props) {

  const [isLoading, setIsLoading] = useState(true);

  const [user, setUser] = useState({})
  const [loadedUser, setLoadedUser] = useState(false)
  const [loadingUser, setLoadingUser] = useState(false)

  const [games, setGames] = useState([]);
  const [loadedGames, setLoadedGames] = useState(false)
  const [loadingGames, setLoadingGames] = useState(false)

  const [seasons, setSeasons] = useState([]);
  const [loadedSeasons, setLoadedSeasons] = useState(false)
  const [loadingSeasons, setLoadingSeasons] = useState(false)

  const socket = io("ws://localhost:5000", {transports: ['websocket']})
  // const socket = io("wss://scrubs-pool-league.herokuapp.com/", {transports: ['websocket']})  

  useEffect(() => {

      if(!loadedUser && !loadingUser){
        loadUser()
      }

      if(!loadedSeasons && !loadingSeasons){
        loadSeasons()
      }

      if(!loadedGames && !loadingGames){
        loadGames()
      }

      if(loadedUser && loadedGames && loadedSeasons){
        setIsLoading(false)
      }
      
  }, [user, games, seasons]);

  useEffect(() => {

    const newGameHandler = (game) =>{
      setGames([...games, game].sort(compareCreatedAt))
    }

    const newExcuseHandler = (updatedGame) =>{

      var index = games.findIndex(game => game._id == updatedGame._id)
      games[index] = updatedGame
      var newGames = games.map(game => {
        return game._id == updatedGame._id ? updatedGame : game
      })
      setGames(newGames)
    }

    socket.on("NewGame", newGameHandler)
    socket.on("NewExcuse", newExcuseHandler)

    return () => {
      socket.off("NewGame", newGameHandler)
      socket.off("NewExcuse", newExcuseHandler)
    }

  }, [games])

  useEffect(() => {

    const newSeasonHandler = (season) =>{
      setSeasons([...seasons, season].sort(compareCreatedAt))
    }

    const newPlayerHandler = (updatedSeason) =>{
      var index = seasons.findIndex(season => season._id == updatedSeason._id)
      seasons[index] = updatedSeason
      var newSeasons = seasons.map(season => {
        return season._id == updatedSeason._id ? updatedSeason : season
      })
      setSeasons(newSeasons)
    }

    socket.on("NewSeason", newSeasonHandler)
    socket.on("NewPlayer", newPlayerHandler)

    return () => {
      socket.off("NewSeason", newSeasonHandler)
      socket.off("NewPlayer", newPlayerHandler)
    }

  }, [seasons])


  useEffect(() => {

    const updatedUserHandler = (updatedUser) =>{
      loadSeasons()
      loadGames()
      setUser(updatedUser)
    }

    socket.on("UpdatedUser", updatedUserHandler)

    return () => {
      socket.off("UpdatedUser", updatedUserHandler)
    }

  }, [props.users])


  async function loadUser() {
    setLoadingUser(true)
    fetch('/api/auth/user', {credentials: 'same-origin'}).then(function(response){

      response.json().then(responseUser =>{
        setLoadedUser(true)
        setUser(responseUser)
        setLoadingUser(false)
      })      
    })
  }

  async function loadGames() {
    setLoadingGames(true)

    fetch('/api/games').then(function(response){

      response.json().then(responseGames =>{
        setLoadedGames(true)
        setGames(responseGames)
        setLoadingGames(false)
      })
      
    })
  }

  async function loadSeasons() {
    setLoadingSeasons(true)
    fetch('/api/seasons').then(function(response){

      response.json().then(responseSeasons =>{
        setLoadedSeasons(true)
        setSeasons(responseSeasons)
        setLoadingSeasons(false)
      })
      
    })
  }

  function handleLogout() {
    fetch('/api/auth/logout', {credentials: 'same-origin'}).then(function(response){
      
      if(response.ok){
        setUser({})
      }else{
        console.log("FAILURE: Logging out")
      }

    })
  }

  function compareCreatedAt(a,b){
    return b.createdAt > a.createdAt;
  }

  return (
    !isLoading &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Pool League</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>

            { !isEmpty(user)
              ? <>
                  <LinkContainer to={'/user/'+user._id}>
                    <NavItem>{user.name}</NavItem>
                  </LinkContainer>
                  <LinkContainer to="/settings">
                    <NavItem>Settings</NavItem>
                  </LinkContainer>

                  { user.isAdmin && 
                    <LinkContainer to="/admin">
                      <NavItem>Admin</NavItem>
                    </LinkContainer>
                  }

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

      <Routes appProps={{ user, games, seasons, setUser }} />

    </div>
  );
}

export default withRouter(App);