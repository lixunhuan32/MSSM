<template>
    <div class="login">
        <div class="login-wrapper">
            <h1 class="title">
                <i class="el-icon-star-on"></i>
                商品后台管理系统
                </h1>
            <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="账号" prop="username">
                <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                <el-input type="text" v-model="loginForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPwd">
                <el-input v-model.number="loginForm.checkPwd"></el-input>
                </el-form-item>

                <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
                <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        
    </div>
</template>
<script>
import qs from "qs";
export default {
    data() {
       // 包含特殊字符的函数
      const checkSpecificKey= str =>{
        var specialKey= "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
           for(var i=0;i<str.length;i++){
             if(specialKey.indexOf(str.substr(i,1))!=-1){
               return false;
             }
           }
           return true;
      }
      // 验证密码函数
      const pass=(rule,value,callback)=>{
         if(value===""){
           callback(new Error("请输入密码"))
         }else if(value.length<3||value.length>6){
           callback(new Error("密码长度3-6位"))
         }else if(!checkSpecificKey(value)){
           callback(new Error("密码不能包含特殊字符"))
         }else{
           if(this.loginForm.checkPwd !==""){
            this.$refs.loginForm.validateField("checkPwd"); // 调用
           }
            callback();
         }
      };

      // 这是再次验证密码的函数
       const checkPass=(rule,value,callback)=>{
        //  rule是传入的验证规则 value是用户输入的值 callback是一个回调函数
         if(value === ""){
           callback(new Error("请再次输入密码"));
         }else if(value!=this.loginForm.password){
           callback(new Error("两次输入的密码已一致"))
         }
          callback();
        };

  
      
      return {
        loginForm: {
          urername: '',
          password: '',
          checkPwd: ''
        },
        // 验证规则
        rules: {
          username: [
            // 
            { required:true, message:"请输入账号", trigger: 'blur' }, //非空验证
            {min:3,max:5,  message:"账号长度在 3-6位", trigger:"blur"} //长度验证
          ],
          password: [
            { required:true,validator:pass,trigger: 'blur'  }
          ],
          checkPwd: [
            {required:true,validator:checkPass,trigger: 'blur' }
          ]
        }
      };
    },
    
    methods: {  
      //  点击登陆按钮触发这个函数
      submitForm(formName) {
        // 获取表单组件 调用验证方法validate
        this.$refs[formName].validate((valid) => {
          //  如果所用前段验证通过 validate里面的值就是true
          if (valid) {
            // 点击登陆按钮这里就可以收集到的数据发送给前段
            let params={
              username:this.loginForm.username,
              password:this .loginForm.password,
            };
              this.axios.post("/login/checklogin",qs.stringify(params))
              .then(response=>{
              // 接收后端返回的验证码和提示信息
              let{error_code,reason,username,token}=response.data;
              if(error_code===0){
                 //  把token保存在浏览器的本地存储中
                window.localStorage.setItem('token',token);
                 // 接收后端返回的用户名存入本地存储方便以后调用
                window.localStorage.setItem('username', username);
                 this.$message({ //给成功的提示框
                type: "success",
                message: reason
                 });
                   // 跳转到后端首页
                this.$router.push('/');
              }else{
                this.$message({ //给失败的提示框
                type: "success",
                message: reason
                 });
               }
              })
              .catch(err=>{
                console.log(err)
              })
            // 这是Vue也就是this.$router一内置跳转方法push
          } else {
            console.log('前段验证失败，不能提交给后台');
            return false;
          }
        });
      },
      // 点击重置按钮触发这个函数
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
}
</script>
<style lang="less">
.login{
    width:100%;
    height:100%;
    background:#2d3a4b;
    .login-wrapper{
       position:fixed;
       top:0;
       bottom:0;
       right:0;
       left:0;
       margin: auto auto;
       width:600px;
       height:400px;
       background:rgba(0,0,0,0.3);
       border-radius:10px;
       padding-right:100px;
       padding-top:50px;
       color:#fff;
      .title{
          text-align:center;
          color:#fff;
      }
      .el-form{
          .el-form-item{
            .el-form-item__label{
                color:#fff;
            }
          }
      }
    }
}
</style>

