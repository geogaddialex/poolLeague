var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    name: { type: String, validate: /^[0-9a-zA-Z\-\/_£?:.,\s]*$/, minlength: 1, maxlength: 30 },
    password: { type: String },
    isAdmin: { type: Boolean, default: false }

},
{
  timestamps: true
});

userSchema.methods.generateHash = function(password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	if(this.password != null){
        return bcrypt.compareSync(password, this.password);
    }else{
        return false;
    }
};

module.exports = mongoose.model('User', userSchema);