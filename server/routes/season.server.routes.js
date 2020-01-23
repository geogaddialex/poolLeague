var Season = require( '../models/season.server.model' );
var seasons = require('../controllers/season.server.controller');
var express = require('express');
var router = express.Router();

router.get('/', seasons.list );
router.post('/', seasons.add );
router.post('/join', seasons.join );

module.exports = router;