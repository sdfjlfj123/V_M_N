var express = require('express');
const userController = require('../controller/userController');
var router = express.Router();

const multer = require('multer')
const upload = multer({ dest: 'public/avataruploads/' })
const upload1 = multer({ dest: 'public/coveruploads/' })
const upload2 = multer({ dest: 'public/productuploads/' })
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});
router.post('/user/login', userController.Login)
router.post('/user/center', upload.single('file'), userController.UserCenter)
router.post('/user/userAdd', upload.single('file'), userController.UserAdd)

router.get('/user/userList', userController.UserList)
router.delete('/user/userList/:id', userController.UserDel)
router.post('/user/userList', userController.UserPost)

router.post('/news/newAdd', upload1.single('file'), userController.NewAdd)
router.get('/news/newList', userController.NewList)
router.get('/news/newList/:id', userController.NewList)
router.put('/news/newList', userController.NewPublish)
router.delete('/news/newList/:id', userController.NewDel)
router.post('/news/newList', upload1.single('file'), userController.NewPost)

router.post('/product/productAdd',upload2.single('file'),userController.ProductAdd)
router.get('/product/productList',userController.ProductList)
router.delete('/product/productList/:id',userController.ProductDel)
router.post('/product/productList',upload2.single('file'),userController.ProductEdit)
module.exports = router;
