import React from "react";
import { Table } from "react-bootstrap";
import "./LeagueTable.css";

export default function LeagueTable({
  className = "",
  ...props
}) {

  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {

    	Promise.all([loadUsers(), loadGames()]){
    		setIsLoading(false)
    	}

    }

    onLoad();
  }, [props.isAuthenticated]);

  async function loadUsers() {
    fetch('/api/users').then(function(response){

      response.json().then(responseUsers =>{
        setUsers(responseUsers)
      })
      
    })
  }

  async function loadGames() {
    fetch('/api/games').then(function(response){

      response.json().then(responseGames =>{
        setGames(responseGames)
      })
      
    })
  }

  return (

    <Table
      className={`LeagueTable ${className}`}
      {...props}
    />

  );
}