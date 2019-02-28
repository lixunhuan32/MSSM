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
  path: ['/login/checklogin',]  // 不需要验证token的地址
}));


router.use( (err, req, res, next) => {
  //当token验证失败时会抛出如下错误
  if (err.name === 'UnauthorizedError') {   
      //这个需要根据自己的业务逻辑来处理
      res.status(401).send('无效的token 未授权...');
  }
});


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('我是goods...');
});
  //接收添加商品页的请求
 router.post('/goodsadd', (req, res) => {
   // 接收参数
   let {cateName, barCode, goodsName, costPrice, marketPrice, salePrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc} = req.body;
  //  console.log(cateName, barCode, goodsName, costPrice, marketPrice, salePrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc)
   // 构造sql把数据插入数据库
   const sqlStr = `insert into goods(cateName, barCode, goodsName, costPrice, marketPrice, salePrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc) 
   values(?,?,?,?,?,?,?,?,?,?,?,?)`;
 
   // 参数
   const sqlParams = [cateName, barCode, goodsName, costPrice, marketPrice, salePrice, goodsNum, goodsWeight, unit, discount, promotion, goodsDesc]; 
 
   // 执行sql
   connection.query(sqlStr, sqlParams, (err, data) => {
     if (err) throw err;
    //  console.log(data)
     // 判断受影响的行数
     if (data.affectedRows > 0) {  
       // 如果大于0 代表插入成功 那么就给前端返回成功的数据对象
       res.send({"error_code": 0, "reason":"添加商品成功"});
     } else {
       // 失败：返回给前端失败的数据对象
       res.send({"error_code": 1, "reason":"添加商品失败"});
     }
   })

   });
 // 接收前段请求分页数据的请求
 router.get('/goodslistbypage',(req,res)=>{
  // res.send('1')
//  // 接收前端参数
let {pageSize, currentPage,cateName, keyWord} = req.query;
 console.log(pageSize, currentPage,cateName, keyWord)
//  // 默认值
pageSize = pageSize ? pageSize : 3;
currentPage = currentPage ? currentPage : 1

// 构造sql语句 （查询所有数据 按照时间排序）
let sqlStr = `select * from goods where 1 = 1`;
// 执行sql语句
connection.query(sqlStr, (err, data) => {
 if (err) throw err;
 // 计算数据总条数
 let total = data.length;

 // 分类名不为空 且 全部 那么 就拼接分类条件
if (cateName !== "" && cateName !== "全部") {
  sqlStr += ` and cateName='${cateName}'`;
}

// 如果关键字不为空 就要拼接关键字查询条件
if (keyWord !== "") {
  sqlStr += ` and (goodsName like "%${keyWord}%" or barCode like "%${keyWord}%")`
};

// 经过以上的判断条件后的再次满足后就可以得到数据的总条数是按分类查询后的总条数
connection.query(sqlStr,(err,data) => {
  if(err) throw err;
 total =data.length;
});
// 再拼接按时间排序
sqlStr +=` order by ctime desc`;

 // 分页条件 (跳过多少条)
 let n = (currentPage - 1) * pageSize;
 // 拼接分页的sql语句
 sqlStr += ` limit ${n}, ${pageSize}`;

 // 执行sql语句 （查询对应页码的数据）
 connection.query(sqlStr, (err, data) => {
   if (err) throw err;
   // 把数据返回给前端 两个数据 数据总条数 total 和 对应页码的数据 data
   res.send({
     total,
     data
   })
 })
})
})









//   // 接收请求所有商品数据的请求
// router.post('/search', (req, res) => {
//   // 接收参数
//   let {cateName, keyWord} = req.body;

//   // 构造sql
//   let sqlStr = `select * from goods where 1 = 1`;

//   // 分类名不为空 且 全部 那么 就拼接分类条件
//   if (cateName !== "" && cateName !== "全部") {
//     sqlStr += ` and cateName='${cateName}'`;
//   }

//   // 如果关键字不为空 就要拼接关键字查询条件
//   if (keyWord !== "") {
//     sqlStr += ` and (goodsName like "%${keyWord}%" or barCode like "%${keyWord}%")`
//   }

//   // 执行sql
//   connection.query(sqlStr, (err, data) => {
//     if (err) throw err;
//     res.send(data);
//   })
// })

// 接收删除操作请求
router.get('/goodsdeluser',(req, res,)=>{
  // 接收前端发过的id 根据id查询数据
  let { id } = req.query;
  // 构造SQL查询语句根据id来查询
  const sqlStr = `delete from goods where id=${id}`
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //  判断受影响的行数
    if (data.affectedRows > 0) {
      // 如果大于0带包插入成功 那么就返回成功的数据对象
      res.send({ "error_code": 0, "msg": "删除数据成功" })
    } else {
      //否则就返回成功的数据对象
      res.send({ "error_code": 1, "msg": "删除数据失败" })
    }
  })
  // res.send('goodsdeluser...');
});


module.exports = router;
