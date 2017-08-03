var express = require('express');
var router = express.Router();
var item = require('../../models/item');
var redis = require('../../common/redis');

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
    var insertData = {title: req.body.title, img: req.body.img, vote_num: req.body.vote_num};
    item.create(insertData, function(err, product, doc){
        if(err){
            console.log(err);
        }else{
            redis.get('items', function(err, itemData){
                if(err){
                    console.log(err);
                }else{
                    if(itemData){
                        itemData = JSON.parse(itemData);
                        itemData._id = product.id;
                        itemData.push(insertData);
                        redis.setex('items', 60, JSON.stringify(itemData));
                    }
                }
            });

            var data = {
                code: 2001,
                msg: '添加成功'
            }
            res.end(JSON.stringify(data));
        }
    });
});

module.exports = router;