var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var Game = require('./game.server.model')

var seasonSchema = mongoose.Schema({

	name: {type: String },
    start: { type: Date },
    end: { type: Date },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]

},
{
  timestamps: true
});

module.exports = mongoose.model('Season', seasonSchema);