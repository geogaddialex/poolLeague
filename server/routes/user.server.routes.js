var User = require( '../models/user.server.model' );
var users = require('../controllers/user.server.controller');
var express = require('express');
var router = express.Router();

router.get('/', users.list );
router.get('/names', users.listNames );
router.put('/:id', users.update );
router.get('/byUsername/:username', users.lookupUserByUsername, function( req, res ){ res.json( req.user ) } )
router.get('/:id', users.lookupUser, function( req, res ){ res.json( req.user ) });


module.exports = router;