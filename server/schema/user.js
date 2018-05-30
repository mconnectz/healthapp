const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const auto = require('mongoose-auto-increment');
auto.initialize(mongoose.connection);

let user_schema = mongoose.Schema({
  role:{type: String,default:'user' },
  username: { type: String },
  password:{ type: String }
});


user_schema.pre('save', function(next){

  if(!this.isModified('password'))
    return next();

  bcrypt.hash(this.password,null,null,(err,hash) => {
    if(err)return next(err);
    this.password = hash;
    next();
  });

});

user_schema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) { return callback(err); }
    callback(null, isMatch);
  });
};

user_schema.plugin(auto.plugin, {
    model: 'kings',
    startAt: 1000,
    incrementBy:1
});


module.exports = mongoose.model('kings', user_schema);
