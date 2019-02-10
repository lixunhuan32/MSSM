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
                 <el-form-item label="原密码" prop="pass">
                <el-input type="text" v-model="modifyAccountForm.pass" autocomplete="off"></el-input>
                </el-form-item> 
                 <!-- 新密码 -->
                 <el-form-item label="新密码" prop="password">
                <el-input type="text" v-model="modifyAccountForm.password" autocomplete="off"></el-input>
                </el-form-item> 

                  <el-form-item label="新密码" prop="checkPwd">
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

export default {
    data(){
      //  新密码
      const pass=(rule,value,callback)=>{
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
           pass:'',
       password:'',
        checkPwd:''
         },
          // 验证规则
         rules: {
          pass: [
            // 原来密码验证
            { required:true, message:"请输入原密码", trigger: 'blur' }, //非空验证
          ],
          // 新密码验证
          password: [
            { required:true,validator:pass,trigger:'blur'  }
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
          alert(" 密码修改成功 前端验证通过 可以提交给后端！");

          // 收集用户输入的所有账号数据
          let params = {
            pass: this.modifyAccountForm.pass,  //原来的面
            checkPwd: this.modifyAccountForm.checkPwd, //现在的新密码
          };

          console.log(`原来的密码是：${params.pass} 现在的密码是：${params. checkPwd}`)
        // 跳转到账号管理页面
        this.$router.push('/accountmanage')

        } else {
          // 否则就是false
          alert("密码修改失败 前端验证失败 不能提交给后端！");
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
