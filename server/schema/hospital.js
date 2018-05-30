const mongoose = require('mongoose');
const auto = require('mongoose-auto-increment');
auto.initialize(mongoose.connection);

let hospital = mongoose.Schema({
  role:{type: String,default:'hospital' },
  name: { type: String },
  phone:{ type: String },
});

hospital.plugin(auto.plugin, {
    model: 'hospitals',
    startAt: 300000,
    incrementBy:1
});

module.exports = mongoose.model('hospitals', hospital);

