  export function getMinGames(season){
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(season.start);
    const today = new Date();
    const diffDays = Math.round(Math.abs((firstDate - today) / oneDay));
    return Math.round(diffDays / 1.5)
  }

  export function isEmpty(obj){
  	return JSON.stringify(obj) == "{}"
  }