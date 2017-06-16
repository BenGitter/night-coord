const mongoose = require("mongoose");

// Bar schema
const BarSchema = mongoose.Schema({
  bar_id: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
});

const Bar = module.exports = mongoose.model('Bar', BarSchema);

module.exports.getUserById = function(id, callback){
  Bar.findById(id, callback);
}