var Season = require( '../models/season.server.model' );

exports.list = function( req, res ){

    Season.find({ }, function( err, seasons ){

        seasons = Object.keys(seasons).map(function(key) {
            return seasons[key];
        });

        if( err ){
            return res.status( 500 );
        }
        
        res.json(seasons);   
    })
}

exports.add = function( req, res ){

    var season = new Season(req.body)
    season.save(function(err, season){
        if (err) return console.error(err);
    })
    res.status(200).json(season)
}