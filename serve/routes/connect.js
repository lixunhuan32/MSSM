//  引入 mysql
const mysql=require('mysql');


//   创建链接对象
const connection=mysql.createConnection({
    host:'localhost',//数据库地址
    user:'root',//数据库用户名
    password:'root',//数据库密码
    // port:'3306', //3306就是默认端口号
    database:'smms' //数据库名字
});

// 执行链接方法
connection.connect(()=>{
    console.log('数据库链接成功')
})

//  把链接对象暴露出去
module.exports=connection;
