var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var vitalityDB = new Schema({
    email:{ type: String },
    nickname:{ type: String },
    id:{type:String},
    password: { type: String },
});
module.exports = mongoose.model('users', vitalityDB);
