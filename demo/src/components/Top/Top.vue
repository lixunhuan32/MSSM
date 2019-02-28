<template>
    <div class="top">
    <el-row>
  <el-col :span="12">
      <div class="top-left">
          <i class='el-icon-loading'></i>华联超市管理系统
          </div>
      </el-col>
  <el-col :span="12">
       <div class="top-right">
         <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        欢迎您<span class="username">{{username}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="personal">个人中心</el-dropdown-item>
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
      <div class="avatar">
         <img width="100%" height="100%" :src="avatarUrl" alt="">
        </div>
      </el-dropdown>
        
       </div>
       </el-col>
</el-row> 
    </div>
</template>
<script>
export default {
    data(){
        return{
            username:"",
            avatarUrl:'',
        }
    },
 methods: {
     // 获取头像
        getAvatar () {
            this.axios.get('/login/getavatar')
            .then(response => {
                let data = response.data.data;
                    // 拼接路径，除了根路径后面的存的是相对路径
                this.avatarUrl ='http://127.0.0.1:9999' + data[data.length - 1].imgUrl;//取最后一个对象里的URL地址为准
               
                // console.log(data[data.length - 1].imgUrl);
            })
            .catch(err => {
                console.log(err)
            })
        },

     handleCommand (command) {
            // 如果点击的是退出
            if (command === 'logout') {
                // 清除token
                window.localStorage.removeItem('token');

                // 弹出提示
                this.$message({
                    type: 'success',
                    message: '欢迎回来！哥哥'
                })
                setTimeout(() => {
                    // 跳转到登录页面
                    this.$router.push('/login')
                }, 1000)
            }else if(command === 'personal'){
           
                   this.$router.push('/personal')

            }
     },
},
created () {  //钩子函数
        // 通过登录页面收集到的token中的username把他渲染到前端用户名的位置
        this.username = window.localStorage.getItem('username');
        // 调用获取头像的函数
         this.getAvatar();
    }
}

</script>
<style lang="less">
.top{
    .top-left{
      text-align-last:left;
    margin-top:30px;
      font-weight:1200px;
      font-size:20px;
    }
   .top-right{
        text-align-last:right;
        line-height:60px;
        text-align:center;
        padding-right:20px;
        
        .el-dropdown{
            .el-dropdown-link{
                text-align:center;
                font-size:18px;
                .username{
                    color:#ffd04b;
                    margin-left:10px;

                }
            }
            .avatar{
            display:inline-block;
            width:60px;
            height:60px;
            margin-left:10px;
            text-align:center;
            img{
                border-radius:50%;
            }
        }
        }
   
    
}
    
}
</style>
