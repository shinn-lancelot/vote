var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('admin/index', {title: '投票系统'});
})

module.exports = router;