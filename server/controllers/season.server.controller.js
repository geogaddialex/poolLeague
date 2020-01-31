var Season = require( '../models/season.server.model' );

exports.list = function( req, res ){

    Season.find({ }).populate({ 
        path: 'players'
    }).exec( function( err, seasons ){

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
        if (err) return res.status(500).json({ errors: "Could not create season" });
    })

    var populatedSeason = season.populate('players').execPopulate()
    populatedSeason.then(season => {
        var socketio = req.app.get('socketio');
        socketio.sockets.emit("NewSeason", season);
        res.status(200).json(season)
    }) 
}

exports.join = function( req, res ){

    let user = req.body.user
    let season = req.body.season

    Season.findOne({ '_id': season._id }).populate({ 
        path: 'players'
    }).exec( function( err, season ){

        if( err ){  
            return res.status(500).json({ errors: "Could not retrieve season" });
        }

        if( !season ){
            return res.status(404).json({ errors: "No such season" });
        } 

        if(!season.players.some(player => player._id == user._id)){
        
            season.players = season.players.concat([user])

            season.save(function(err) {
                        
                if (err){
                    return res.status(500).json({ errors: "Could not add player to season" });
                }

                var socketio = req.app.get('socketio');
                socketio.sockets.emit("NewPlayer", season);
                return res.status(200).json(season);
            });

        }else{
            return res.status(400).json({ errors: "Player already joined" });
        }
        
    });

}