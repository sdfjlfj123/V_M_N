var express = require('express');
const webController = require('../controller/webController');
var router = express.Router();
router.get('/new/list',webController.NewList)
router.get('/new/list/:id',webController.NewList)
router.get('/new/toplist',webController.Toplist)
router.get('/product/list',webController.ProductList)
module.exports = router;