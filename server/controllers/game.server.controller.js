var Game = require( '../models/game.server.model' );

exports.list = function( req, res ){

    Game.find({ }, function( err, games ){

        games = Object.keys(games).map(function(key) {
            return games[key];
        });

        if( err ){
            console.log( "error: " + err );
            return res.status( 500 );
        }
        
        res.json(games);
    })
}

exports.add = function( req, res ){

    var game = new Game(req.body)
    game.save(function(err, game){
        if (err) return console.error(err);
    })
    res.status(200).json(game)
}