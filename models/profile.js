var mongoose = require('mongoose'),
Schema = mongoose.Schema;

var user = new Schema({
    _user      : { type: Schema.Types.ObjectId, ref: 'user' },
    id         : { type: String },
    updated_at : { type: Date, default: Date.now }
},{ strict: false });


module.exports = mongoose.model('profile', profile);
