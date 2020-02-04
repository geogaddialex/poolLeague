var Game = require( '../models/game.server.model' );
var games = require('../controllers/game.server.controller');
var express = require('express');
var router = express.Router();

router.get('/', games.list );
router.post('/', games.add );
router.delete('/:id', games.delete)
router.post('/addExcuse', games.addExcuse);

module.exports = router;