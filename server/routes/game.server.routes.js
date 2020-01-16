var Game = require( '../models/game.server.model' );
var games = require('../controllers/game.server.controller');
var express = require('express');
var router = express.Router();

router.get('/', games.list );
// router.put('/:id', games.update );

module.exports = router;