import * as SeasonUtils from "./SeasonUtils";

export function getUser(userId, users){
	return users.find(player => player._id == userId)
}

export function getName(userId, users){
	return users.find(player => player._id == userId).name
}

export function getBestTNSR(user, games, seasons, users){
  	const TNSRS = seasons.map( season => {
	    const seasonGames = SeasonUtils.getGamesForSeason(games, season)
	    const player = getUser(user, users)
	    const TNSR = calculateTNSR(seasonGames, player, season)
	    return TNSR
	})

  	return Math.round(Math.max( ...TNSRS ) * 100) / 100
}

export function countWins(games, user){
    return games.filter(game => game.winner._id === user._id).length
}

export function countLosses(games, user){
	return games.filter(game => game.loser._id === user._id).length
}

export function countPlayed(games, user){
	return games.filter(game => game.winner._id === user._id || game.loser._id === user._id).length
}

export function countSevenBallsFor(games, user){
	return games.filter(game => game.winner._id === user._id && game.special === "7 Ball").length
}

export function countSevenBallsAgainst(games, user){
	return games.filter(game => game.loser._id === user._id && game.special === "7 Ball").length
}

export function countFoulsFor(games, user){
	return games.filter(game => game.winner._id === user._id && game.special === "Foul Win").length
}

export function countFoulsAgainst(games, user){
	return games.filter(game => game.loser._id === user._id && game.special === "Foul Win").length
}

export function calculatePoints(games, user){
	return countWins(games, user) + countSevenBallsFor(games, user)*2 - countFoulsFor(games, user)*0.5
}

export function calculateTNSR(games, user, season){

	let points = 0
	let losses = 0

	const opponents = season.players.filter(player => player._id !== user._id)

	opponents.forEach(opponent => {

	  getWinsAgainst(opponent, user, games).forEach( (game, index) => {

	    const base = Math.pow(0.9, index)

	    switch(game.special){
	      case "Seven":
	        points += base*3;
	        break;
	      case "Foul":
	        points += base*0.5;
	        break;
	      case "None":
	        points += base;
	        break;
	    }

	  })

	  getLossesAgainst(opponent, user, games).forEach( (game, index) =>{
	    losses += Math.pow(0.9, index)
	  })

	})

	return points / (losses + countPenalty(games, user, season) )
}

export function calculateAllTimeTNSR(games, user, users){
	const player = getUser(user, users)
	let losses = countLosses(games, player) > 0 ? countLosses(games, player) : 1
	return Math.round(calculatePoints(games, player) / losses * 100) /100
}

export function countUnderMin(games, user, season){
	return countPlayed(games, user) < SeasonUtils.getMinGames(season) ? SeasonUtils.getMinGames(season) - countPlayed(games, user) : 0
}

export function getGamesForUser(games, user){
	return games.filter(game => game.winner._id == user._id || game.loser._id == user._id)
}

export function countUnplayed(games, user, season){
	const unique = []

	getGamesForUser(games, user).forEach((game) => {
	  if(game.winner._id == user._id && !unique.some(opponent => opponent._id == game.loser._id) && game.loser !== "select" ){
	    unique.push(game.loser)
	  }else if (game.loser._id == user._id && !unique.some(opponent => opponent._id == game.winner._id) && game.winner !== "select"){
	    unique.push(game.winner)
	  }
	})

	if(season.name == "Season 1" || season.name == "Season 2" || season.name == "Season 3"){
	  return 0
	}
	return (season.players.length - unique.length - 1 >= 0) ? season.players.length - unique.length - 1 : 0
}

export function countPenalty(games, user, season){
	return countUnderMin(games, user, season) + countUnplayed(games, user, season)
}

export function userPlayed(game, player){
  	return player._id == game.winner._id || player._id == game.loser._id
}

export function userInSeason(season, userId){
  return season.players.findIndex(player => player._id == userId) >= 0
}

export function getPosition(player, season, games){

	const playerTNSR = calculateTNSR(games, player, season)

	const TNSRS = season.players.map( user => {
      const TNSR = calculateTNSR(games, user, season)
      return TNSR
    }).sort(function(a, b){return b-a})

    const positon = TNSRS.findIndex(value => value == playerTNSR)
    return positon+1
}

export function countSeasonWins(player, seasons, games){

	let wins = 0
	seasons.map( season =>{
		if(new Date(season.end) < new Date()){
			if(getPosition(player, season, SeasonUtils.getGamesForSeason(games, season)) == 1){
				wins ++
			}
		}
	})
	return wins
}

export function getWinsAgainst(opponent, user, games){
	return games.filter(game => game.winner._id == user._id && game.loser._id == opponent._id)
}

export function getLossesAgainst(opponent, user, games){
	return games.filter(game => game.loser._id == user._id && game.winner._id == opponent._id)
}

export function calculateWinsToFirst(games, user, season, players){
    let max = players[0]
    let TNSRdiff = calculateTNSR(games, max, season) - calculateTNSR(games, user, season) + 0.01
    let losses = countLosses(games, user) > 0 ? countLosses(games, user) : 1
    let penalty = countPenalty(games, user, season)

    return max === user ? 0 : Math.ceil(TNSRdiff * (losses+countPenalty(games, user, season)))
}

export function calculateWinsToRankUp(games, user, season, players){
    let index = players.indexOf(user)

    if(index === 0 ){
      return 0
    }else{
      let upOne = season.players[index-1]
      let TNSRdiff = calculateTNSR(games, upOne, season) - calculateTNSR(games, user, season) + 0.01
      let losses = countLosses(games, user) > 0 ? countLosses(games, user) : 1
      return Math.ceil(TNSRdiff * (losses+countPenalty(games, user, season)))
    }
}

export function playersSortedByTNSR(games, season){
	const sortedPlayers = season.players.map(player => {
			player.tnsr = calculateTNSR(games, player, season)
			return player
		}).sort((a,b) => {
			return b.tnsr - a.tnsr
		})
	return sortedPlayers
}

