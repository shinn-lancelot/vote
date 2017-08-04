var express = require('express');
var router = express.Router();
var multer = require('../../common/multer');

router.post('/', multer.single('file'), function(req, res, next){
    res.send({code: 3001, msg: '上传成功'});
});

module.exports = router;