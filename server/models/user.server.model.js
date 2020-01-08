var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({

    name: { type: String, validate: /^[0-9a-zA-Z\-\/_£?:.,\s]*$/, minlength: 1, maxlength: 70 },
    password: { type: String, validate: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ }
    isAdmin: { type: Boolean, default: false }

},
{
  timestamps: true
});

userSchema.methods.generateHash = function(password) {

    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	if(this.local.password != null){
        return bcrypt.compareSync(password, this.local.password);
    }else{
        return false;
    }
};

module.exports = mongoose.model('User', userSchema);