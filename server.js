var path              = require( 'path' )
var express  	        = require( 'express' )
var socketio 	        = require( 'socket.io' )
var http		          = require( 'http' )
var logger            = require( 'morgan' )
var favicon           = require( 'serve-favicon' )
var cookieParser      = require( 'cookie-parser' )
var bodyParser        = require( 'body-parser' )
var session           = require( 'cookie-session' )
var passport 	        = require( 'passport' )
var mongoose          = require( 'mongoose' )
                        require( 'datejs' )
                        require( './server/config/passport' )( passport )
                        require( './server/config/database' )( mongoose )

var app               = express( );

app.use( express.static( 'client' ) );
app.use( logger('dev') );
app.use( cookieParser() ); 
app.use( bodyParser.json() ); 
app.use( bodyParser.urlencoded({ extended: false }) );

app.use( session({
    secret: 'badsecret',
    resave: false,
    saveUninitialized: false
}));

app.use( passport.initialize() );
app.use( passport.session() );

var authRoutes = require( './server/routes/authentication.server.routes.js' )( passport )
var userRoutes = require( './server/routes/user.server.routes.js' );
var gameRoutes = require( './server/routes/game.server.routes.js' );
var seasonRoutes = require( './server/routes/season.server.routes.js' );

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/seasons', seasonRoutes);

app.get('/', function(req, res) {
		res.sendFile( '/index.js', {root: './client/src'} );
})

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

var port = 9000
var server = app.listen( port )
var io = socketio.listen( server, { origins: '*:*' });
app.set( 'socketio', io );

console.log( 'API live at port: ' + port )
module.exports = app;
