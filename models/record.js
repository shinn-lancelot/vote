var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var recordScheMa = new Schema({
    item_id: String,
    add_time: Date,
    ip: String
}, {versionKey: '_versionKey'});
var record = mongoose.model('records', recordScheMa);
module.exports = record;
