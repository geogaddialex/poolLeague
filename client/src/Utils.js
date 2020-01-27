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
  return date.getDate() + "/" + (date.getMonth() + 1) + " " + date.getHours() + ":" + date.getMinutes()
}