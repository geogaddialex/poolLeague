export function isEmpty(obj){
  var objString = JSON.stringify(obj)
  var empty = objString == "{}" || objString == undefined || objString == "[]"
	return empty
}

export function sameDay(a,b){
  return a.getDate() == b.getDate() && a.getMonth() == b.getMonth() && a.getFullYear == b.getFullYear
}

export function formatDate(dateString){
  var date = new Date(dateString)
  return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()
}

export function formatDateAndTime(dateString){
  var date = new Date(dateString)
  return date.getDate() + "/" + (date.getMonth() + 1) + " " + ('0'+date.getHours()).slice(-2) + ":" + ('0'+date.getMinutes()).slice(-2);
}

export function dp(input){
	return Math.round(input * 1000) / 100
}

export function compareCreatedAt(a,b){
  return new Date(b.createdAt) - new Date(a.createdAt);
}