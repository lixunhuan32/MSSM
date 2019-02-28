const express = require('express');
const router = express.Router();



// 引入连接数据库的模块
const connection = require('./connect');

// 引入express-jwt 用于验证token
const expressJwt = require('express-jwt');
// 引入jwt
const jwt = require('jsonwebtoken');
// 定义秘钥
const secretKey = 'itsource';


// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
  // 设置响应头 解决跨域(目前最主流的方式)
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的请求头
  res.header("Access-Control-Allow-Headers", "authorization");
  next();
})

// 使用模块 express-jwt 验证token
router.use(expressJwt ({
  secret:  secretKey 
}).unless({
  path: ['/login/checklogin','/login/upload','/login/accountinfo','/login/getavatar']  // 不需要验证token的地址
}));

//拦截器
router.use( (err, req, res, next) => {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {   
      //这个需要根据自己的业务逻辑来处理
      res.status(401).send('无效的token 未授权...');
  }
});
// 接收前段传过来的账号和密码看数据库是否存在， 账号和密码是在添加页面添加进去的
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

/* 
  个人信息路由: /accountinfo
*/
router.get('/accountinfo', (req, res) => {
  // res.send("1")
  // 个人信息 响应给前端
  res.send(req.user);
})


/* 
  头像上传请求
*/
// node后端处理上传文件的模块
var multer = require('multer');
// 配置存储路径 用时间差重命名
var storage = multer.diskStorage({
    // 配置文件上传到服务器后的位置
    destination: 'public/upload',
    // 文件的名字
    filename: function (req, file, cb) {
        // fiel.originalname : avatar.jpg
        var fileFormat =(file.originalname).split(".");  // ['avatar', 'jpg']
        // 取时间戳
        var filename = new Date().getTime();  
        // 拼接文件名 时间戳.jpg
        cb(null, filename + "." + fileFormat[fileFormat.length - 1]);
    }
});

// 执行上传图片到服务器
var upload = multer({
    storage
});

// 上传请求
router.post("/upload",  upload.single('file'), (req, res) => {
  let { filename } = req.file;
  let imgUrl = '/upload/' + filename;
  // res.send("1")

  console.log('文件路径:', imgUrl);
  // 把图片地址存入数据库
  // 构造sql
  const sqlStr = `insert into imgurl(imgUrl) values('${imgUrl}')`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send('上传成功!')
    }
  })
})

// 获取头像请求
router.get('/getavatar', (req, res) => {
  // 构造sql
  const sqlStr = `select * from imgurl`;
  // 执行sql
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    res.send({data});
  })
})


module.exports = router;