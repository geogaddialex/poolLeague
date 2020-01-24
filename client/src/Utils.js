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
    // console.log("Empty? " + empty +" : " + objString)
  	return empty
  }