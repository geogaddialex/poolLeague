var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var User = require('./user.server.model')

var gameSchema = mongoose.Schema({

    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    loser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    foul: { type: Boolean, default: false },
    seven: { type: Boolean, default: false }

},
{
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);