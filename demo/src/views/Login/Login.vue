<template>
  <div class="login">
    <!-- 登陆表单容器 -->
    <div class="login-wrapper">
      <!-- 登录标题 -->
      <h1 class="title">
        <i class="el-icon-menu"></i>
        华联超市管理系统-登录
      </h1>

      <!-- 登录表单 -->
      <el-form
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
        class="demo-loginForm"
      >
        <!-- 账号 -->
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="loginForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item label="密码" prop="pass">
          <el-input type="text" v-model="loginForm.pass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="text" v-model="loginForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 登陆和重置 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')">登陆</el-button>
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  // 数据
  data() {
    // 包含特殊字符的函数
    const checkSpecificKey = str => {
      var specialKey =
        "[`~!#$^&*()=|{}':;',\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'";
      for (var i = 0; i < str.length; i++) {
        if (specialKey.indexOf(str.substr(i, 1)) != -1) {
          return false;
        }
      }
      return true;
    };
    // rule是传入的验证规则  value是用户输入的值 callback是一个回调函数
    // 验证密码的函数
    const pass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 3 || value.length > 6) {
        callback(new Error("密码长度在3 -6 位之间"));
      } else if (!checkSpecificKey(value)) {
        callback(new Error("密码不能包含特殊字符"));
      } else {
        if (this.loginForm.checkPass !== "") {
          // 如果确认密码不为空
          this.$refs.loginForm.validateField("checkPass"); // 调用确认密码的验证（一致性验证）
        }
        // 成功的回调
        callback();
      }
    };

    // 验证确认密码的函数
    // rule是传入的验证规则  value是用户输入的值 callback是一个回调函数
    const checkPass = (rule, value, callback) => {
      // 如果等于空
      if (value === "") {
        // 输出提示
        callback(new Error("请再次输入密码"));
        // 如果确认密码 和 密码不同
      } else if (value !== this.loginForm.pass) {
        // 输出提示
        callback(new Error("两次密码输入不一致"));
      }
      // 如果直接调用 不传入任何错误信息 就是成功 绿色的勾勾
      callback();
    };

    return {
      loginForm: {
        username: "",
        pass: "",
        checkPass: ""
      },

      //   验证规则
      /* 
        验证规则字段说明：
            { required: true/false 必填,   message: "错误的提示信息", trigger: "触发验证的方式" }
            { min: 最小长度, max: 最大长度, message: "错误的提示信息", trigger: "触发验证的方式" }
            { validator： 自定义验证规则函数名，  trigger: 'blur'}
        */
      rules: {
        // 验证用户名
        username: [
          // 非空验证
          { required: true, message: "请输入账号", trigger: "blur" },
          // 长度验证
          { min: 3, max: 5, message: "账号长度在3 - 5 位", trigger: "blur" }
        ],
        // 验证密码
        pass: [
          // 非空验证  自定义验证函数
          { required: true, validator: pass, trigger: "blur" }
        ],
        // 确认密码验证  自定义验证函数
        checkPass: [{ required: true, validator: checkPass, trigger: "blur" }]
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
          alert("前端验证通过 可以提交给后端！");
          // 后续就可以把收集的账号和密码 一起发送给后端 验证用户名和密码的正确性。
          // 收集账号和密码
          let params = {
            username: this.loginForm.username,
            pass: this.loginForm.pass
          };

          // 发送请求 把参数发给后端（把用户名和密码发给后端 验证是否正确）
          //  console.log(params)
          // 直接跳转到后端主页
          this.$router.push("/");
        } else {
          // 否则就是false
          alert("前端验证失败 不能提交给后端！");
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
.login {
  width: 100%;
  height: 100%;
  background-color: #2d3a4b;
  .login-wrapper {
    width: 500px;
    height: 400px;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 8px;
    // 垂直水平居中
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    margin: auto;
    padding: 30px 50px 0 10px;
    .title {
      font-size: 20px;
      margin-left: 60px;
      margin-bottom: 20px;
    }
    .el-form-item {
      .el-form-item__label {
        color: #fff;
      }
    }
  }
}
</style>
