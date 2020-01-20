var Season = require( '../models/season.server.model' );
var seasons = require('../controllers/season.server.controller');
var express = require('express');
var router = express.Router();

router.get('/', seasons.list );
// router.put('/:id', seasons.update );

module.exports = router;