var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');
var User = require('./user.server.model')

var gameSchema = mongoose.Schema({

    winner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    loser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    special: { type: String, default: "None" },
    excuses: [{
    	author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    	comment: { type: String }
    }]

},
{
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);