var User = require( '../models/user.server.model' );
var express = require('express');
const jwt = require('jsonwebtoken');

module.exports = function( passport ){

  var router = express.Router();

  router.get( '/user', function( req, res ){

    if( !req.user ){
      return res.status( 404 ).json({ message: "no user"})
    }

    res.status( 200 ).json(req.user);

  });


  router.get( '/status', function( req, res ){

    if( !req.isAuthenticated() ){
      return res.status( 200 ).json({ authenticated: false });
    }
    res.status( 200 ).json({ authenticated: true });

  });


  router.get( '/logout', function( req, res ){

    req.logout();
    res.status( 200 ).json({ message: "bye"});

  })


  router.post( '/login', function( req, res, next ){

    passport.authenticate('local-login', {session: false}, function( err, user, info ){

      if( err ){
        return next( err );
      }

      if( !user ){
        
        return res.status(401).json({
          err: info
        });
      }

      req.logIn( user, function( err ){

        if( err ){

          return res.status( 500 ).json({
            err: 'Could not log in user'
          });

        }

        const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
        res.status( 200 ).json({ user: token });
      });

    })( req, res, next );
  });


  router.post('/signup', function(req, res, next) {

      passport.authenticate('local-signup', {session: false}, function(err, user, info) {

          if ( err ){
            return res.status(500).json({ errors: "Could not create user" });
          }

          if ( !user ){
            return res.status(500).json({ errors: "Could not create user" });
          }

          req.login( user, loginErr => {

              if ( loginErr ){
                return next( loginErr );
              }

              const token = jwt.sign(user.toJSON(), 'your_jwt_secret');
              console.log(token)
              res.status( 200 ).json({ user: token });

          });  

      })(req, res, next);
  });


  return router;
}