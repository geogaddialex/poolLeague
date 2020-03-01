import * as Utils from "./Utils"

export function allTimeSeason(users) {
  return {
    start: new Date("01/01/2000"),
    end: new Date("01/01/3000"),
    players: users
  }
}

export function getCurrentSeasonIndex(seasons){
  const index = seasons.sort(startedEarliest).map(season =>{
    return isSeasonOpen(season)
  }).indexOf(true)
  return index > -1 ? index : 0
}

export function isSeasonOpen(season){
  var today = new Date()
  var start = new Date(season.start)
  var end = new Date(season.end)

  return today > start && ( today < end || today.getDate() == end.getDate() )
}

export function hasSeasonStarted(season){
  var today = new Date()
  var start = new Date(season.start)
  var end = new Date(season.end)

  return today > start
}

export function canJoinSeason(season){
  var today = new Date()
  var deadline = new Date(season.start)
  deadline.setDate(deadline.getDate() + 7);
  return today < deadline || Utils.sameDay(today, deadline)
}

export function getGamesForSeason(games, season){
  var seasonStart = new Date(season.start)
  var seasonEnd = new Date(season.end)

  return games.filter(game => {

    var gameDate = new Date(game.createdAt)
    const gameBetweenDates = gameDate.getTime() > seasonStart.getTime() && gameDate.getTime() < seasonEnd.getTime()
    const gameOnStart = Utils.sameDay(seasonStart, gameDate)
    const gameOnEnd = Utils.sameDay(seasonEnd, gameDate)
    const gameInSeason = gameBetweenDates || gameOnStart || gameOnEnd

    return gameInSeason
  })
}

export function getMinGames(season){

  switch(season.name){
    case "Season 1":
      return 10;
    case "Season 2":
      return 15
    case "Season 3":
      return 15
  }

  if(!hasSeasonStarted(season)) return 0
    
  const oneDay = 24 * 60 * 60 * 1000;
  const seasonStart = new Date(season.start);
  const seasonEnd = new Date(season.end);
  const today = new Date();

  const lastDay = today < seasonEnd ? today : seasonEnd
  const diffDays = Math.floor(Math.abs((seasonStart - lastDay) / oneDay));
  return Math.round(diffDays / 1.5)
}

export function isOverlapping(season, seasons){

  var overlapping = false
  var checkSeasonStart = new Date(season.start)
  var checkSeasonEnd = new Date(season.end)
    seasons.map(oneSeason => {

      var oneSeasonStart = new Date(oneSeason.start)
      var oneSeasonEnd = new Date(oneSeason.end)

      if(checkSeasonStart > oneSeasonStart &&  ( checkSeasonStart < oneSeasonEnd || Utils.sameDay(checkSeasonStart, oneSeasonStart) ) ){
        overlapping = true
      }else if(checkSeasonEnd > oneSeasonStart &&  ( checkSeasonEnd < oneSeasonEnd || Utils.sameDay(checkSeasonEnd, oneSeasonEnd) ) ){
        overlapping = true
      }else if(oneSeasonStart > checkSeasonStart &&  ( oneSeasonStart < checkSeasonEnd || Utils.sameDay(oneSeasonStart, checkSeasonEnd) ) ){
        overlapping = true
      }else if(oneSeasonEnd > checkSeasonStart &&  ( oneSeasonEnd < checkSeasonEnd || Utils.sameDay(oneSeasonEnd, checkSeasonEnd) ) ){
        overlapping = true
      }
    })

  return overlapping
}

export function startedEarliest(a,b){
  var aB = new Date(a.start).getTime() < new Date(b.start).getTime()
  return aB
}