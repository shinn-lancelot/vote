var express = require('express');
var router = express.Router();
var multer = require('../../common/multer');

router.post('/',  function(req, res, next){
    var upload = multer.single('file');

    res.send({code: 3001, msg: '上传成功'});
});

module.exports = router;