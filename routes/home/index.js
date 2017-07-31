var express = require('express');
var router = express.Router();
var item = require('../../models/item');

router.get('/', function(req, res, next) {
    item.find(function(err, doc){
        res.render('home/index', { title: 'vote', items: doc});
    });
});

module.exports = router;
