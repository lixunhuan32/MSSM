// 主要负责用户管理模块的路由处理
var express = require('express');
var router = express.Router();


//  接收根目录请求
router.get('/',(req,res)=>{
  res.send('这是后端路由，这里是users')
})
//  接收根目录请求
router.get('/addAccount',(req,res)=>{
  //  接收前端发过来的参数
  let{username,password, userGroup}=req.body;
  // console.log(username,password, userGroup)
  res.setHeader('Access-Control-Allow-Origin','*')
  res.send('这是后端路由，这里是/addAccount')
})


module.exports = router;
