var comments = require('../controllers/comment.server.controller');
var express = require('express');
var router = express.Router();

router.delete('/forUser/:id', comments.deleteAllForUser );

module.exports = router;