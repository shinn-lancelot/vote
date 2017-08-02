var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var userScheMa = new Schema({
    username: String,
    password: String,
    appid: String,
    appsecret: String,
});
var user = mongoose.model('users', userScheMa);
module.exports = user;
