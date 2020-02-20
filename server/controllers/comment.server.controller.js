var Game = require( '../models/game.server.model' );
var User = require( '../models/user.server.model' );

exports.deleteAllForUser = function( req, res ){
    var id = req.params.id;

    Game.find({ "excuses.author": id }, function(err){
        if (err) return res.status(404).json({errors: "Could not delete game"})
    })

    Game.updateMany({ "excuses.author": id }, { $pullAll: {uid: [req.params.deleteUid] } } )

    var socketio = req.app.get('socketio');
    socketio.sockets.emit("DeletedComment", id);
    return res.status(200).json({message: "Deleted comments for user "+id})
}