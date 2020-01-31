export function getMinGames(season){
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(season.start);
  const today = new Date();
  const diffDays = Math.floor(Math.abs((firstDate - today) / oneDay));
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
  backgroundColor: "#ebebf8",
  fontWeight: "bold"
};

export function isSeasonOpen(season){
  var today = new Date()
  var start = new Date(season.start)
  var end = new Date(season.end)

  return today > start && ( today < end || today.getDate() == end.getDate() )
}