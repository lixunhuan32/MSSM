// 主要负责用户管理模块的路由处理
var express = require('express');
var router = express.Router();


//  接收根目录请求
router.get('/', (req, res) => {
  res.send('这是后端路由，这里是users')
});
// 引入链接数据库模块
const connection = require('./connect.js');

// 统一设置响应头 解决跨域问题
router.all('*', (req, res, next) => {
  // 设置响应头解决跨域问题
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


//  接收添加账号请求addaccount录请求
router.post('/addAccount', (req, res) => {
  //  接收前端发过来的参数
  let { username, password, userGroup } = req.body;
  //console.log(username,password, userGroup)
  // // 接收到前段数据，把数据存入数据库
  // // 构建增加数据的sql语句
  const sqlStr = `insert into account(username,password,userGroup)values('${username}','${password}','${userGroup}')`
  // 执行sq语居
  connection.query(sqlStr, (err, data) => {
    if (err) throw err; //如果有错就抛出错误
    //  如果大于0 代表插入成功 那么就返回成功的数据对象就到response给前端
    if (data.affectedRows > 0) {
      res.send({ "errCode": 0, "msg": "插入数据成功" });
    } else {
      res.send({ "errCode": 1, "msg": "插入数据失败" });
    }
  })
});
//  接收itunes请求渲染账号列表列表
router.get("/accountlist", (req, res) => {

  // 构造sql语句查询所有数据并且按照时间排序order by ctime desc就是按照时间排序降序
  const sqlStr = 'select * from account order by ctime desc';
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 把查询到的数据响应给前端
    res.send(data)
  })
});
// 接收删除账号请求的理由
router.get('/accountdel', (req, res) => {
  // 接收前端发过的id 根据id查询数据
  let { id } = req.query;
  // 构造SQL查询语句根据id来查询
  const sqlStr = `delete from account where id=${id}`
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    //  判断受影响的行数
    if (data.affectedRows > 0) {
      // 如果大于0带包插入成功 那么就返回成功的数据对象
      res.send({ "error_code": 0, "msg": "删除数据成功" })
    } else {
      //否则就返回成功的数据对象
      res.send({ "error_code": 0, "msg": "删除数据失败" })
    }
  })
});
//接收编辑修改数据的请求把原来的数据接收到发给前段，前段回填到模态框
router.get('/accountedit', (req, res) => {
  // 接收前段发过来的id
  let { id } = req.query;
  // 根据id查询数据,编写sql语句
  const sqlstr = `select * from account where id=${id}`;
  // 执行sql语句
  connection.query(sqlstr, (err, data) => {
    if (err) throw err;
    // 把查询出来的结果返回给前段
    res.send(data)
  })

});
//  接收保存修改后的数据
router.post('/saveeditaccount', (req, res) => {
  // 接收修改后的新数据和原来的id
  let { username, usergroup, editid } = req.body;
  // 构造sql语句
  const sqlstr = `update account set username='${username}',usergroup='${usergroup}' where id=${editid}`;
  //  执行sql语句
  connection.query(sqlstr, (err, data) => {
    if (err) throw err;
    // affectedRows > 0代表插入成功响应给前段response里成功的信息
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "修改数据成功" })
    } else {
      res.send({ "error_code": 1, "reason": "修改数据失败" })
    }
  })
});
// 接收批量删除的请求
router.get("/batchdelect", (req, res) => {
  let { idArr } = req.query;//接收前段传过来的id根据id查询数据执行删除操作
  // 构造删除数据的sql语句
  const sqlstr = `delete from account where id in (${idArr})`;
  // 执行sql语句进行删除
  connection.query(sqlstr, (err, data) => {
    if (err) throw err;
    if (data.affectedRows > 0) {
      res.send({ "error_code": 0, "reason": "批量删除成功" })
    } else {
      res.send({ "error_code": 0, "reason": "批量删除成功" })
    }
  })

});
// 接收分页功能实现的请求pageSize每页显示的条数，currentPage当前页码
router.get("/accountlistbypage", (req, res) => {
  //接收前端发过来的 pageSize每页显示的条数 currentPage当前页码
  let {pageSize,currentPage} = req.query;
    // 根据时间排序呢查询所有的数据
  let sqlStr = `select * from account order by ctime desc`;
  // 执行sql语句
  connection.query(sqlStr, (err, data) => {
    if (err) throw err;
    // 计算数据总条数保持到total变量里
    let total= data.length;
    // 分页条件 (跳过多少条)  根据当前的页码计算出应该输出的数据
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
module.exports = router;

