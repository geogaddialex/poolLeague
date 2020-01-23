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
        if (err) return console.error(err);
    })
    res.status(200).json(season)
}

exports.join = function( req, res ){

    let user = req.body.user
    let season = req.body.season

    Season.findOne({ '_id': season._id }).exec( function( err, season ){
        if( err ){  
            return res.status(500).json({ errors: "Could not retrieve season" });
        }

        if( !season ){
            return res.status(404).json({ errors: "No such season" });
        } 

        if(!season.players.some(player => player == user._id)){
            console.log(user._id + " not found, adding...")

            season.players.push(user)
            season.save(function(err) {
                        
                if (err){
                    return res.status(500).json({ errors: "Could not add player to season" });
                }
                    
                return res.status(200).json(season);
            });

        }else{
            console.log(user._id + " already joined, not adding: " + JSON.stringify(season.players) )
            return res.status(400).json({ errors: "Player already joined" });
        }
        
    });

}