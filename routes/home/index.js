var express = require('express');
var router = express.Router();
var item = require('../../models/item');

router.get(['/','/index'], function(req, res, next) {
    item.find(function(err, doc){
        res.render('home/index', { title: 'vote', year: 2017, items: doc});
    });
});

module.exports = router;
