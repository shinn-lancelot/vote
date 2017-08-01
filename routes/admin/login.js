var express = require('express');
var router = express.Router();
var user = require('../../models/user');

router.get(['/','/login'], function (req, res, next) {
    res.render('admin/login', {title: '登录'});
})

router.post('/login', function (req, res, next) {
    user.count({username: req.body.username, passowrd: req.body.passowrd}, function(err, doc){
        if(doc == 1){
            res.redirect('index');
        }else{
            console.log(err);
            res.end('login fail');
        }
    });
})

module.exports = router;