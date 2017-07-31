var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var itemScheMa = new Schema({
    title: String,
    img: String,
    vote_num: Number
});	//	定义了一个新的模型，但是此模式还未和item集合有关联
var item = mongoose.model('item', itemScheMa); //	与item集合关联
module.exports = item;
