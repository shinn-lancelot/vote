var express = require('express');
var router = express.Router();
var item = require('../../models/item');

router.post('/', function (req, res, next) {
    // item.findByIdAndUpdate(req.body.id, {vote_num:44}, {}, function(){
    //
    // });

    item.findById(req.body.id, function(err, doc){
        if(err){
            console.log("Error:"+err);
        }else{
            item.findByIdAndUpdate(req.body.id, {vote_num: doc.vote_num+1}, {}, function(err, doc){
                if(err){
                    console.log("Error:"+err);
                }else{
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