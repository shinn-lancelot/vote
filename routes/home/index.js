var express = require('express');
var router = express.Router();
var item = require('../../models/item');
var redis = require('../../common/redis');

router.get(['/','/index'], function(req, res, next) {
    //获取items缓存数据
    redis.get('items', function(err, data){
        if(err){
            console.log(err);
        }else{
            if(data){
                //存在缓存，则直接渲染视图
                render(JSON.parse(data));
            }else{
                //打印缓存已过期
                console.log('data is expired');
                //从mongodb查询投票选项
                item.find(function(err, doc){
                    //投票选项写入redis缓存（转字符串写入），60秒后缓存过期
                    redis.setex('items', 60, JSON.stringify(doc));
                    //渲染视图
                    render(doc);
                });
            }
        }
    });

    //渲染视图方法
    function render(data){
        res.render('home/index', { title: '投票', year: 2017, items: data});
    }
});

module.exports = router;
