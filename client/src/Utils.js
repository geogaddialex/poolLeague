export function getMinGames(season){
  const oneDay = 24 * 60 * 60 * 1000;
  const seasonStart = new Date(season.start);
  const seasonEnd = new Date(season.end);
  const today = new Date();

  const lastDay = today < seasonEnd ? today : seasonEnd
  const diffDays = Math.floor(Math.abs((seasonStart - lastDay) / oneDay));
  return Math.round(diffDays / 1.5)
}

export function isEmpty(obj){
  var objString = JSON.stringify(obj)
  var empty = objString == "{}" || objString == undefined || objString == "[]"
	return empty
}

export function formatDate(dateString){
  var date = new Date(dateString)
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

export function formatDateAndTime(dateString){
  var date = new Date(dateString)
  return date.getDate() + "/" + (date.getMonth() + 1) + " " + ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2);
}

export function userPlayed(game, user){
  return user._id == game.winner._id || user._id == game.loser._id
}

export function userInSeason(season, userId){
  return season.players.findIndex(player => player._id == userId) >= 0
}

export const myRow = {
  backgroundColor: "#ebebf8"
};

export function isSeasonOpen(season){
  var today = new Date()
  var start = new Date(season.start)
  var end = new Date(season.end)

  return today > start && ( today < end || today.getDate() == end.getDate() )
}

export function getGamesForSeason(games, season){
  var seasonStart = new Date(season.start)
  var seasonEnd = new Date(season.end)

  return games.filter(game => {

    var gameDate = new Date(game.createdAt)
    return ( gameDate > seasonStart || gameDate.getDate() == seasonStart.getDate() ) &&  ( gameDate < seasonEnd || gameDate.getDate() == seasonEnd.getDate() )
  })
}

export function isOverlapping(season, seasons){

  var overlapping = false
  var checkSeasonStart = new Date(season.start)
  var checkSeasonEnd = new Date(season.end)
    seasons.map(oneSeason => {

      var oneSeasonStart = new Date(oneSeason.start)
      var oneSeasonEnd = new Date(oneSeason.end)

      if(checkSeasonStart > oneSeasonStart &&  ( checkSeasonStart < oneSeasonEnd || checkSeasonStart.getDate() == oneSeasonEnd.getDate() ) ){
        //field start inside another season
        overlapping =  true

      }else if(checkSeasonEnd > oneSeasonStart &&  ( checkSeasonEnd < oneSeasonEnd || checkSeasonEnd.getDate() == oneSeasonEnd.getDate() ) ){
        //field end inside another season
        overlapping = true
      
      }else if(oneSeasonStart > checkSeasonStart &&  ( oneSeasonStart < checkSeasonEnd || oneSeasonStart.getDate() == checkSeasonEnd.getDate() )){
        //loop start inside field range
        overlapping = true

      }else if(oneSeasonEnd > checkSeasonStart &&  ( oneSeasonEnd < checkSeasonEnd || oneSeasonEnd.getDate() == checkSeasonEnd.getDate() )){
        //loop end inside field range
        overlapping = true
      }
    })

  return overlapping
}