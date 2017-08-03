var redis = require('redis');
var redisIp = '127.0.0.1';
var redisPort = '6379';

var client = redis.createClient(redisPort, redisIp);
client.on('connect', function() {
    console.log('redis is connected');
});
client.on('end', function(){
    console.log('redis is end');
});

module.exports = client;