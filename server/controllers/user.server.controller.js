var User = require( '../models/user.server.model' );

exports.list = function( req, res ){

    User.find({ }, function( err, users ){

        users = Object.keys(users).map(function(key) {
            return users[key];
        });

        if( err ){
            console.log( "error: " + err );
            return res.status( 500 );
        }
        
        res.json({ users: users });
            
    })
}

exports.update = function( req, res ){

    var id = req.params.id;

    User.findByIdAndUpdate(id, { $set: { "name": req.body.name } }, {new: true, runValidators: true}, (err, user) => {  

        if( err ){
            console.log( "error: " + err );
            return res.status(500).json({ errors: "Could not update user" });
        } 

        res.status( 200 ).json({ message: "User updated!", user });
    });
};


exports.lookupUser = function(req, res, next) {

    var id = req.params.id;

    User.findOne({ '_id': id }).exec( function( err, user ){
        if( err ){  
            return res.status(500).json({ errors: "Could not retrieve user" });
        }

        if( !user ){
            return res.status(404).json({ errors: "No such user" });
        } 
        
        req.user = user;
        next();
    });
}


exports.lookupUserByUsername = function(req, res, next) {

    var username = req.params.username;

    User.findOne({ 'name': username }).exec( function( err, user ){
        if( err ){  

            return res.status(500).json({ errors: "Could not retrieve user" });
        }

        if( !user ){

            return res.status(404).json({ errors: "No such user" });
        } 
        
        req.user = user;
        next();
    });
}
