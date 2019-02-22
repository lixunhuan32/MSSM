const express = require('express');
const router = express.Router();

const connection = require('./connect.js'); //连接数据库

const jwt=require('jsonwebtoken');//引入拦截路由的组件 需要下载jsonwebtoken模块
const secretKey='itsource'; //定义密钥


router.all('*', (req, res, next) => {
  // 设置响应头解决跨域问题
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
 
router.post('/checklogin', (req, res) => {
  // 接收前段传过来的数据
　let{username,password}=req.body;
   // 构造sql（查询用户名和密码是否存在）
  const sqlStr = `select * from account where username='${username}' and password='${password}'`;
  //执行spl语句
  connection.query(sqlStr,(err,data)=>{
    if(err) throw err;
    if(!data.length){ //如果数据不存在也就是data没有length
      res.send({'error_code': 1, 'reason': '请检查用户名或密码!'});
    }else{//数据纯在
         //得到的当前数据是一个数组，第0项就是一个对象
       const obj=data[0];
       //去掉nodejs中对象前面的单词用深拷贝得到一个干静的对象
       const objstr=JSON.stringify(obj);
       const accountObj=JSON.parse(objstr);
     
        // 生成token data[0]是接到的数据,secretKey是密钥,{expiresIn:60*60}每次利用账号密码登陆的有效事件24小时
        const token=jwt.sign(accountObj,secretKey,{expiresIn:60*60*60});
        // accountObj.username把本次登录的用户名返回给前段存入数据库方便显示登录名和个人信息模块的调用 和token返回给前段
        res.send({'error_code': 0, 'reason': '登陆成功!','username':accountObj.username,token});
        
    }
  })
  
 
});

module.exports = router;
