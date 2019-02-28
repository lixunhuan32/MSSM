<template>
    <div class="personal">
        <!-- 面板组件 -->
       <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>个人中心</span>
            </div>
            <div class="text item">
                <div class="info">
                    <h3>账号信息:</h3>
                    <p>账号: {{userInfo.username}}</p>
                    <p>用户组: {{userInfo.usergroup}}</p>
                    <p>创建时间: {{userInfo.ctime | filterCtime}}</p>
                </div>     
                <div>
                    <el-upload
                        class="avatar-uploader"
                        action="http://127.0.0.1:9999/login/upload"
                        ow-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <!-- 图片显示 -->
                        <!-- v-if="avatarUrl说明 当用户点击加号上传图片时把添加的图片回显在图片框里，这并不能代表上传成功 -->
                        <!-- 点击审查元素才能看到该文件的name属性，必须和后台对应 -->
                        <img v-if="avatarUrl" :src="avatarUrl" class="avatar">
                        <!-- 提示上传成功的信息图标 -->
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>    
                    <!-- <el-button @click="saveAvatar">
                        确定
                    </el-button> -->
                </div>        
            </div>
        </el-card>
    </div>
</template>
<script>
// 引入moment
import moment from "moment";
import qs from "qs";
export default {
  data() {
    return {
      avatarUrl: "", // 头像地址
      userInfo: {
        // 用户信息
        username: "",
        usergroup: "",
        ctime: ""
      }
    };
  },
  created() {
    // 发送请求获取个人信息
    this.getAccountInfo();
  },
  methods: {
    // 获取账号信息
    getAccountInfo() {
      // 发送请求
      this.axios.get("/login/accountinfo")
        .then(response => {
          // 接收后端返回的数据
          console.log(response.data)
        //   this.userInfo = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
   
    // 图片上传前的函数 
    handleAvatarSuccess(res, file) {
     // 上传成功 回显图片   
      this.avatarUrl = URL.createObjectURL(file.raw);
    },
    // 图片上传前后的函数 一般不需要改动
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  filters: {
    // 过滤时间
    filterCtime(val) {
      return moment(val).format("YYYY/MM/DD hh:mm:ss");
    }
  }
};
</script>
<style lang="less">
.personal {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
      .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader .el-upload:hover {
        border-color: #409eff;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
  }
}
</style>


