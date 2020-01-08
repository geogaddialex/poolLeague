var LocalStrategy    = require('passport-local').Strategy;
var User             = require('../models/user.server.model');

const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;

module.exports = function( passport ){

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {

        User.findById(id)
        .exec( function(err, user) {
            done(err, user);
        });
    });


    passport.use('local-signup', new LocalStrategy({

        usernameField : 'name',
        passwordField : 'password',
        passReqToCallback : true


    }, function(req, name, password, done) {

        process.nextTick(function() {

            User.findOne({ 'name' : name }, function(err, user) {


                if( err ){
                    return done(err);
                }

                if( user ){

                    return done(null)

                } else {

                    var newUser                 = new User();
                    newUser.name                  = req.body.name

                    if( password && password.match( /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ ) ){
                        newUser.password      = newUser.generateHash(password);
                    }

                    newUser.save(function(err) {
                        
                        if (err){
                            console.log("error: " + err)
                            done(null)
                        }

                        console.log("success = \n\n" + JSON.stringify(newUser))
                            
                        return done(null, newUser);
                    });
                }

            });    

        });

    }));


    passport.use('local-login', new LocalStrategy({

        usernameField : 'name',
        passwordField : 'password',
        passReqToCallback : true

    }, function(req, name, password, done) {


        User.findOne({ 'name' : name }, function(err, user) {

            if (err)
                return done(err);

            if (!user){

                return done(null)

            }else if (!user.validPassword(password)){

                return done(null)
            }

            return done(null, user);
        });

    }));


    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey   : 'your_jwt_secret'
    },
    function (jwtPayload, cb) {

        console.log("payload: " + JSON.stringify(jwtPayload) )

        return User.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }));

};

