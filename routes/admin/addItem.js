var express = require('express');
var router = express.Router();
var item = require('../../models/item');

router.get('/', function(req, res, next){
    res.render('admin/addItem', {title: '添加投票选项'});
});

router.post('/', function (req, res, next) {
    //插入数据方式一
    // var data = {title: req.body.title, img: req.body.img, vote_num: req.body.vote_num};
    // var itemInsert = new item(data);
    // itemInsert.save(function(err){
    //     if(err){
    //         console.log(err);
    //     }else{
    //         console.log('成功插入数据');
    //     }
    // });

    //插入数据方式二
    item.create({title: req.body.title, img: req.body.img, vote_num: req.body.vote_num}, function(err, doc){
        if(err){
            console.log(err);
        }else{
            console.log('success');
        }
    });
});

module.exports = router;