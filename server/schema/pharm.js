const mongoose = require('mongoose');
const auto = require('mongoose-auto-increment');
auto.initialize(mongoose.connection);


let pharm = mongoose.Schema({
  role:{type: String,default:'pharm' },
  name: { type: String },
  phone:{ type: String },
});

pharm.plugin(auto.plugin, {
    model: 'kings',
    startAt: 4000000,
    incrementBy:1
});

module.exports = mongoose.model('pharms', pharm);

