var Season = require( '../models/season.server.model' );

exports.list = function( req, res ){

    Season.find({ }, function( err, seasons ){

        seasons = Object.keys(seasons).map(function(key) {
            return seasons[key];
        });

        if( err ){
            return res.status( 500 );
        }
        
        res.json({ seasons: season });
            
    })
}

// exports.update = function( req, res ){

//     var id = req.params.id;

//     game.findByIdAndUpdate(id, { $set: { "name": req.body.name } }, {new: true, runValidators: true}, (err, game) => {  

//         if( err ){
//             console.log( "error: " + err );
//             return res.status(500).json({ errors: "Could not update game" });
//         } 

//         res.status( 200 ).json({ message: "game updated!", game });
//     });
// };