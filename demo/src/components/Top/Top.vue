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

         <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        欢迎您<span class="username">{{username}}</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item>退出登录</el-dropdown-item>
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
            username:"andmin",
            avatarUrl:'http://127.0.0.1:8080/avatar.jpg',
        }
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
            height:100%;
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
