var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var itemScheMa = new Schema({
    title: String,
    img: String,
    vote_num: Number
}, {versionKey: '_versionKey'});
var item = mongoose.model('items', itemScheMa);
module.exports = item;
