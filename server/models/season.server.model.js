var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Game = require('./game.server.model')

var seasonSchema = mongoose.Schema({

    games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
    start: { type: Date },
    end: { type: Date }

},
{
  timestamps: true
});

module.exports = mongoose.model('Season', seasonSchema);