import * as SeasonUtils from "./SeasonUtils";
import * as Utils from "./Utils";

export function getUser(userId, users){

	const user = users.find(player => player._id == userId)
	const noUser = { _id: "nope", name: "No user found" }
	return Utils.isEmpty(user) ? noUser : user 
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

export function getOpponents(season, user){
	return season.players.filter(player => player._id !== user._id)
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

export function calculateOldPoints(games, user){
	return countWins(games, user) + countSevenBallsFor(games, user)*2 - countFoulsFor(games, user)*0.5
}

export function calculatePoints(games, user, season){
	let points = 0

	getOpponents(season, user).forEach(opponent => {
		getWinsAgainst(opponent, user, games).forEach( (game, index) => {
			const base = Math.pow(0.9, index)

			switch(game.special){
				case "7 Ball":
					points += base*3;
					break;
				case "Foul Win":
					points += base*0.5;
					break;
				case "None":
					points += base;
					break;
			}
		})
	})
	return points
}

export function calculateLosses(games, user, season){
	let losses = 0

	getOpponents(season, user).forEach(opponent => {
		getLossesAgainst(opponent, user, games).forEach( (game, index) =>{
			losses += Math.pow(0.9, index)
		})
	})

	return losses
}

export function calculateTNSR(games, user, season){
	let points = calculatePoints(games, user, season)
	let losses = calculateLosses(games, user, season)
	const divisor = (losses + countPenalty(games, user, season)) > 0 ? (losses + countPenalty(games, user, season)) : 1 

	return points / divisor
}

export function calculateAllTimeTNSR(games, user, users){
	const player = getUser(user, users)
	let losses = countLosses(games, player) > 0 ? countLosses(games, player) : 1
	return calculateOldPoints(games, player) / losses
}

export function countUnplayed(games, user, season){
	const unique = []

	if(season.name == "Season 1" || season.name == "Season 2" || season.name == "Season 3"){
	  return 0
	}

	getGamesForUser(games, user).forEach((game) => {
	  if(game.winner._id == user._id && !unique.some(opponent => opponent._id == game.loser._id) && game.loser !== "select" ){
	    unique.push(game.loser)
	  }else if (game.loser._id == user._id && !unique.some(opponent => opponent._id == game.winner._id) && game.winner !== "select"){
	    unique.push(game.winner)
	  }
	})
	//accounts for RTN undefined opponent and self... could change RTN to only use games with both players filled in
	return (season.players.length - unique.length - 1 >= 0) ? season.players.length - unique.length - 1 : 0
}

export function countPenalty(games, user, season){
	return countUnderMin(games, user, season) + countUnplayed(games, user, season)
}

export function countUnderMin(games, user, season){
	return countPlayed(games, user) < SeasonUtils.getMinGames(season) ? SeasonUtils.getMinGames(season) - countPlayed(games, user) : 0
}

export function getGamesForUser(games, user){
	return games.filter(game => game.winner._id == user._id || game.loser._id == user._id)
}

export function userPlayed(game, player){
  	return player._id == game.winner._id || player._id == game.loser._id
}

export function userInSeason(season, userId){
  return season.players.findIndex(player => player._id == userId) >= 0
}

export function countStars(player, seasons, games, position){
	let wins = 0
	seasons.map( season =>{
		if(new Date(season.end) < new Date()){
			if(playersSortedByTNSR(SeasonUtils.getGamesForSeason(games, season), season).findIndex(user =>  user._id == player._id) == position-1){
				wins++
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

export function getMaxTNSR(games, season, players){
	return calculateTNSR(games, players[0], season)
}

export function calculateWinsToFirst(games, user, season, players){
	const maxTNSR = getMaxTNSR(games, season, players)
	return calculateWinsToTNSR(games, user, season, players, maxTNSR)
}

export function calculateWinsToRankUp(games, user, season, players){
    let index = players.indexOf(user)

    if(index === 0) return 0

	let upOne = players[index-1]
	let nextTNSR = calculateTNSR(games, upOne, season)
	return calculateWinsToTNSR(games, user, season, players, nextTNSR)

}

export function calculateWinsToTNSR(games, user, season, players, tnsr){

    let winsAgainst = getOpponents(season, user).map(opponent =>{
    	return getWinsAgainst(opponent, user, games).length
    })

    let mostBeatenCount = Math.max(...winsAgainst)
    let leastBeatenCount = Math.min(...winsAgainst)

    let leastBeatenPoints = calculatePoints(games, user, season)
    let mostBeatenPoints = calculatePoints(games, user, season)
    let losses = calculateLosses(games, user, season)
    let penalty = countPenalty(games, user, season)

    let divisor = losses + penalty > 0 ? losses + penalty : 1 

    let leastBeatenTNSR = leastBeatenPoints / divisor
    let mostBeatenTNSR = mostBeatenPoints / divisor

 	if(leastBeatenTNSR == tnsr) return 0

    let countLeast = 0
    let countMost = 0

   	do{
    	leastBeatenPoints += Math.pow(0.9, leastBeatenCount)
    	winsAgainst[winsAgainst.indexOf(Math.min(...winsAgainst))] += 1
    	leastBeatenCount = Math.min(...winsAgainst)
    	countLeast += 1
    	leastBeatenTNSR = leastBeatenPoints / divisor

    } while (leastBeatenTNSR < tnsr && countLeast <= 99 )


    do{
    	mostBeatenPoints += Math.pow(0.9, mostBeatenCount)
    	mostBeatenCount += 1
    	countMost += 1
    	mostBeatenTNSR = mostBeatenPoints / divisor

    } while (mostBeatenTNSR < tnsr && countMost <= 99 )
    
    countMost = countMost < 99 ? countMost : "99+"
    countLeast = countLeast < 99 ? countLeast : "99+"

    let output = countMost == countLeast ? countLeast : countLeast + " - " + countMost

   	return output
}

export function playersSortedByTNSR(games, season){
	const sortedPlayers = season.players.map(player => {
			player.tnsr = calculateTNSR(games, player, season)
			if(player.name == "AlexTest") console.log(player.tnsr)
			return player
		}).sort((a,b) => {
			return b.tnsr - a.tnsr
		})
	return sortedPlayers
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

export const myRow = {
  backgroundColor: "#ebebf8"
};
