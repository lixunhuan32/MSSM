
<template>
  <div class="add-ccount">
    <el-card class="box-card">
     <div slot="header" class="clearfix">
       <span class="title">添加账号</span>
     </div>
      <!-- 内容部分-->
     <div class="text item">
      <el-form size="medium" :model="addAccountForm" status-icon :rules="rules" ref="addAccountForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="addAccountForm.username" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                <el-input type="text" v-model="addAccountForm.password" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="确认密码" prop="checkPwd">
                <el-input v-model.number="addAccountForm.checkPwd"></el-input>
                </el-form-item>
                  <!-- 选择用户主 -->
                 <el-form-item label="选择用户组" prop="userGroup">
                <el-select v-model="addAccountForm.userGroup" placeholder="选择用户组">
                <el-option label="普通用户" value="普通用户"></el-option>
                <el-option label="高级用户" value="高级用户"></el-option>
                </el-select>
                </el-form-item> 

                <el-form-item>
                <el-button type="primary" @click="submitForm('addAccountForm')">登陆</el-button>
                <el-button @click="resetForm('addAccountForm')">重置</el-button>
                </el-form-item>
            </el-form>
     </div>
  </el-card>
  </div>

</template>

<script>
export default {
    data() {
      // 验证密码函数
      const pass=(rule,value,callback)=>{
         if(value===""){
           callback(new Error("请输入密码"))
         }else if(value.length<3||value.length>6){
           callback(new Error("密码长度3-6位"))
         }else{
           if(this.addAccountForm.checkPwd !==""){
            this.$refs.addAccountForm.validateField("checkPwd"); // 调用
           }
            callback();
         }
      };

      // 这是再次验证密码的函数
       const checkPass=(rule,value,callback)=>{
        //  rule是传入的验证规则 value是用户输入的值 callback是一个回调函数
         if(value === ""){
           callback(new Error("请再次输入密码"));
         }else if(value!=this.addAccountForm.password){
           callback(new Error("两次输入的密码不一致"))
         }
          callback();
        };
      return {
        addAccountForm:{
        username:'',
        password:'',
        checkPwd:'',
         userGroup:'',
      },
        // 验证规则
        rules: {
          username: [
            // 账号验证
            { required:true, message:"请输入账号", trigger: 'blur' }, //非空验证
            {min:3,max:6,  message:"账号长度在 3-6位", trigger:"blur"} //长度验证
          ],
          // 密码验证
          password: [
            { required:true,validator:pass,trigger:'blur'  }
          ],
          // 确认密码验证
          checkPwd: [
            {required:true,validator:checkPass,trigger:'blur' }
          ],
          //  选择用户主
          userGroup:[{required:true,message:'请选择用户组',trigger: 'change'}]
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
            alert('前段验证通过，登陆成功');
            // 点击登陆按钮这里就可以收集到的数据发送给前段
            let params={
              username:this.addAccountForm.username,
              password:this .addAccountForm.password,
              userGroup:this.addAccountForm.userGroup,
            }
            console.log(params)
          //   这是Vue也就是this.$router一内置跳转方法push
          this.$router.push("/iTunes")
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
.add-ccount{
   .el-card{
    .el-card__header{
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
     }
    .el-card__body{
      .text{
       .el-form{
         width:320px;
       }
    }
  }
  }
}
</style>
