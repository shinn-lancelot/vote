var express = require('express');
var router = express.Router();
var item = require('../../models/item');
var redis = require('../../common/redis');
var record = require('../../models/record');
var ip = require('ipaddr');

router.post('/', function (req, res, next) {
    //根据id查询
    item.findById(req.body.id, function(err, doc){
        if(err){
            console.log(err);
        }else{
            //查询更新，票数+1
            item.findByIdAndUpdate(req.body.id, {vote_num: doc.vote_num + 1}, {}, function(err, doc){
                if(err){
                    console.log(err);
                }else{
                    redis.get('items', function(err, data){
                        //若缓存未过期，更新相应选手票数，重新写入缓存
                        if(data){
                            data = JSON.parse(data);
                            for(var i = 0; i < data.length; i++){
                                if(req.body.id == data[i]._id){
                                    data[i].vote_num = doc.vote_num + 1;
                                    break;
                                }
                            }
                            redis.setex('items', 60, JSON.stringify(data));
                        }
                    });

                    //添加投票记录
                    record.create({item_id: req.body.id, add_time: Date.now(), ip: ip.getCurrentIp()}, function(err, doc){
                        if(err){
                            console.log(err);
                        }
                    });

                    var data = {
                        code: 1001,
                        msg: '投票成功'
                    }
                    res.end(JSON.stringify(data));
                }
            });
        }
    });
});

module.exports = router;