<template>
  <div class="modify-Account">
     <el-card class="box-card">
     <div slot="header" class="clearfix">
       <span class="title">修改账号密码</span>
     </div>
      <!-- 账号管理-->
     <div class="text item">
         <el-form size="medium" :model="modifyAccountForm" status-icon :rules="rules" ref="modifyAccountForm" label-width="100px" class="demo-ruleForm"> 
                 <!-- 原密码 -->
                 <el-form-item label="旧密码" prop="pwd">
                <el-input type="text" v-model="modifyAccountForm.pwd" autocomplete="off"></el-input>
                </el-form-item> 
                 <!-- 新密码 -->
                 <el-form-item label="新密码" prop="password">
                <el-input type="text" v-model="modifyAccountForm.password" autocomplete="off"></el-input>
                </el-form-item> 

                  <el-form-item label=" 确认新密码" prop="checkPwd">
                <el-input v-model.number="modifyAccountForm.checkPwd"></el-input>
                </el-form-item> 
                   <!-- 确认新密码 -->
                <el-form-item>
                <el-button type="primary" @click="submitForm('modifyAccountForm')">修改</el-button>
                <el-button @click="resetForm('modifyAccountForm')">清空</el-button>
                </el-form-item>
             </el-form> 

     </div>
  </el-card>
  </div>

</template>

 <script>
 import moment from "moment";
import qs from "qs";
export default {
    data(){
      // 旧的密码
      const checkOldPwd=(rule,value,callback)=>{
     
        // //  获取token中当前登录的账户名
         let username = window.localStorage.getItem("username");
        //  console.log(value,username)
        // val就是用户输入旧密码的值
        this.axios.get(`/users/oldPwd?oldPwd=${value}&username=${username}`) //&username=${username}
        .then(response=>{
          // 接收后端返回的错误码 和 提示信息、
          let { error_code, reason } = response.data;
          if (error_code !== 0) {
            // 错误提示
            callback(new Error(reason));
          } else {
            // 正确的回调
            callback();
          }
        })
        .catch(err=>{
          console.log(err)
        })
      }
      //  新密码
      const password=(rule,value,callback)=>{
        if(value===""){
         callback(new Error("请输入新的密码"))
        }else if(value.length<3||value.length>6){
           callback(new Error("长度在3-6位"))
        }
        else{
          if(this.modifyAccountForm.checkPwd!==""){
              this.$refs.modifyAccountForm.validateField("checkPwd");
          }
          callback();
        }
      }
        // 再次确认新密码
       const checkPass=(rule,value,callback)=>{
        if(value===""){
         callback(new Error("请再次输入新的密码"))
        }else if(value !=this.modifyAccountForm.password){
         callback(new Error("两次输入的密码不一致"));
        }
        else{
          callback();
        }
      }
      
      return{
         modifyAccountForm:{
           pwd:'',//旧密码
       password:'', //新密码
        checkPwd:'' //确认新密码
         },
          // 验证规则
         rules: {
          pwd: [
            // 原来密码验证
            { required:true,validator:checkOldPwd, trigger: 'blur' }, 
          ],
          // 新密码验证
          password: [
            { required:true,validator:password,trigger:'blur'  }
          ],
          // 再猜验证新密码
          checkPwd: [
            {required:true,validator:checkPass,trigger:'blur' }
          ],
        }
      };
     },
        methods: {
    // 点击登录按钮 触发这个函数
    submitForm(formName) {
      // 获取表单组件 调用验证方法
      this.$refs[formName].validate(valid => {
        // 如果所有验证通过 valid就是true
        if (valid) {
          // 收集用户输入的所有账号数据
          let params = {
             username: window.localStorage.getItem("username"), //用户名
             pwd: this.modifyAccountForm.pwd,  //原来的旧密码
            password: this.modifyAccountForm.password, //新密码
         
          };
          // 发送axios给前段
            this.axios.post("/users/savenewpwd", qs.stringify(params))
            .then(response => {
              // 接收后端数据
              let { error_code, reason } = response.data;
              // 判断 如果成功   
              if (error_code === 0) {
                // 清除token
                window.localStorage.removeItem("token");

                // 弹出提示
                this.$message({
                  type: "success",
                  message: reason
                });
                setTimeout(() => {
                  // 跳转到登录页面
                  this.$router.push("/login");
                }, 1000);
              } else {
                // 弹出错误提示
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          // 否则就是false
          return false;
        }
      });
    },
    // 点击重置按钮 触发这个函数
    resetForm(formName) {
      // this.$refs.loginForm.resetFields() 获取整个表单组件 调用重置方法
      this.$refs[formName].resetFields();
    }
  }

};
     
</script>
<style lang="less">
  .modify-Account{
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body{
      .text{
       .el-form{
         width:320px;
        //  margin-bottom:400px;
       
       }
    }
  }
  }
  }
</style>
