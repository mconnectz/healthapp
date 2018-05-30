const mongoose = require('mongoose');

const auto = require('mongoose-auto-increment');
auto.initialize(mongoose.connection);

let lab = mongoose.Schema({
  role:{type: String,default:'lab' },
  name: { type: String },
  phone:{ type: String },
  photo: {type: String}
});

lab.plugin(auto.plugin, {
    model: 'labs',
    startAt: 20000,
    incrementBy:1
});

module.exports = mongoose.model('labs', lab);

