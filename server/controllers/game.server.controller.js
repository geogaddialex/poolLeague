var Game = require( '../models/game.server.model' );
var User = require( '../models/user.server.model' );

exports.list = function( req, res ){

    Game.find()
        .populate('winner')
        .populate('loser')
        .populate({ 
            path: 'excuses.author',
        })
        .exec( function( err, games ){

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
        if (err) return res.status(500).json({ errors: "Could not add game" });
    })

    var populatedGame = game.populate('winner').populate('loser').execPopulate()
    populatedGame.then(game => {
        var socketio = req.app.get('socketio');
        socketio.sockets.emit("NewGame", game);
        res.status(200).json(game)
    }) 

}

exports.addExcuse = function( req, res ){

    let author = req.body.author
    let game = req.body.game
    let comment = req.body.comment

    Game.findOne({ '_id': game._id }).exec( function( err, game ){

        if( err ){  
            return res.status(500).json({ errors: "Could not retrieve game" });
        }

        if( !game ){
            return res.status(404).json({ errors: "No such game" });
        } 
        
            game.excuses = game.excuses.concat([{author: author, comment: comment}])

            game.save(function(err) {
                if (err) return res.status(500).json({ errors: "Could not add excuse to season" });
            });

            var populatedGame = game
            .populate('winner')
            .populate('loser')
            .populate({ 
                path: 'excuses.author',
            }).execPopulate()

            populatedGame.then(game => {
                var socketio = req.app.get('socketio');
                socketio.sockets.emit("NewExcuse", game);
                res.status(200).json(game)
            }) 

    });

}
