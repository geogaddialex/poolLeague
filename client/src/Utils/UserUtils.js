import { getGamesForSeason, getMinGames } from "./SeasonUtils";

export function getUser(userId, users){
	return users.find(player => player._id == userId)
}

export function getName(userId, users){
	return users.find(player => player._id == userId).name
}

export function getBestTNSR(user, games, seasons, users){
  	const TNSRS = seasons.map( season => {
	    const seasonGames = getGamesForSeason(games, season)
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
	let losses = countLosses(games, user) > 0 ? countLosses(games, user) : 1
	return calculatePoints(games, user) / (losses + countPenalty(games, user, season) )
}

export function calculateAllTimeTNSR(games, user, users){
	const player = getUser(user, users)
	let losses = countLosses(games, player) > 0 ? countLosses(games, player) : 1
	return Math.round(calculatePoints(games, player) / losses * 100) /100
}

export function countUnderMin(games, user, season){
	return countPlayed(games, user) < getMinGames(season) ? getMinGames(season) - countPlayed(games, user) : 0
}

export function getGamesForUser(games, user){
	return games.filter(game => game.winner._id == user._id || game.loser._id == user._id)
}

export function countUnplayed(games, user, season){
	const unique = []

	getGamesForUser(games, user).forEach((game) => {
	  if(game.winner._id == user._id && !unique.some(opponent => opponent._id == game.loser._id) ){
	    unique.push(game.loser)
	  }else if (game.loser._id == user._id && !unique.some(opponent => opponent._id == game.winner._id) ){
	    unique.push(game.winner)
	  }
	})

	if(season.name == "Season 1" || season.name == "Season 2" || season.name == "Season 3"){
	  return 0
	}
	return season.players.length - unique.length - 1
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
			if(getPosition(player, season, getGamesForSeason(games, season)) == 1){
				wins ++
			}
		}
	})

	return wins
}