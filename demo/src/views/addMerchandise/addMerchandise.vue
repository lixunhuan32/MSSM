
<template>
  <div class="addMerchandise">
         <el-card class="box-card">
     <div slot="header" class="clearfix">
       <span class="title">添加商品</span>
     </div>
      <!-- 内容部分-->
     <div class="text item">
      <el-form size="medium" :model="addMerchandiseForm" status-icon :rules="rules" ref="addMerchandiseForm" label-width="100px" class="demo-ruleForm">
                    <!-- 所属分类 -->
                 <el-form-item label="所属分类" prop="category">
                <el-select v-model="addMerchandiseForm.category" placeholder="所属分类">
                <el-option label="品食" value="品食"></el-option>
                <el-option label="日化用品" value="日化用品"></el-option>
                <el-option label="生活日用品" value="生活日用品"></el-option>
                </el-select>
                </el-form-item> 
                 <!-- 商品条形码 -->
                <el-form-item label="商品条形码" prop="barcode">
                <el-input type="text" v-model="addMerchandiseForm.barcode" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="商品名称" prop="goodsName">
                <el-input type="text" v-model="addMerchandiseForm.goodsName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="商品售价" prop="goodsPrice">
                <el-input v-model.number="addMerchandiseForm.goodsPrice"></el-input>
                </el-form-item>

                <el-form-item label="市场价" prop="marketPrice">
                <el-input v-model.number="addMerchandiseForm.marketPrice"></el-input>
                </el-form-item>

                <el-form-item label="商品进价" prop="PurchasePrice">
                <el-input v-model.number="addMerchandiseForm.PurchasePrice"></el-input>
                </el-form-item>

                <el-form-item label="入库数量" prop="storageNum">
                <el-input v-model.number="addMerchandiseForm.storageNum"></el-input>
                </el-form-item>

                <el-form-item label="商品数量" prop="goodsNum">
                <el-input v-model.number="addMerchandiseForm.goodsNum"></el-input>
                </el-form-item>

                <el-form-item label="商品单位" prop="goodsNnit">
                <el-input v-model.number="addMerchandiseForm.goodsNnit"></el-input>
                </el-form-item>
                  <!-- 会员优惠 -->
                <el-form-item label="会员优惠" prop="Members">
                <el-radio-group v-model="addMerchandiseForm.Members">
                    <el-radio label="享受"></el-radio>
                     <el-radio label="不享受"></el-radio>
                </el-radio-group>
                </el-form-item>
                  <!-- 是否促销 -->
                <el-form-item label="是否促销" prop="promotion">
                <el-radio-group v-model="addMerchandiseForm.promotion">
                    <el-radio label="启用"></el-radio>
                     <el-radio label="禁用"></el-radio>
                </el-radio-group>
                </el-form-item>
                  <!-- 商品简介 -->
                   <el-form-item label="商品简介" prop="checkPwd">
                  <el-input
                      type="textarea"
                      :rows="1"
                      placeholder="请输入内容超过200个汉字"
                      v-model="addMerchandiseForm.checkPwd">
                    </el-input>
                     </el-form-item> 
                      <!-- 提交按钮 -->
                <el-form-item>
                <el-button type="primary" @click="submitForm('addMerchandiseForm')">添加</el-button>
                </el-form-item>
            </el-form>
     </div>
  </el-card>
  </div>

</template>

<script>

export default {
  data(){
    return{
      addMerchandiseForm:{
         category:'',
         barcode:'',
         goodsName:'',
         goodsPrice:'',
         marketPrice:'',
         PurchasePrice:'',
         storageNum:'',
         goodsNum:'',
         goodsNnit:'', //商品单位
         Members:'', //是否优惠会员优惠
         promotion:'', //是否促销
      }
    }
    //  rules:{
    //       username: [
            
    //         { required:true, message:"请输入账号", trigger: 'blur' }, //非空验证
    //         {min:3,max:5,  message:"账号长度在 3-6位", trigger:"blur"} //长度验证
    //       ],
    //       password: [
    //         { required:true,validator:pass,trigger: 'blur'  }
    //       ],
    //       checkPwd: [
    //         {required:true,validator:checkPass,trigger: 'blur' }
    //       ]
    //  }

  },
  methods:{
     //  点击登陆按钮触发这个函数
      submitForm(formName) {
        // 获取表单组件 调用验证方法validate
        this.$refs[formName].validate((valid) => {
          //  如果所用前段验证通过 validate里面的值就是true
          if (valid) {
            alert('前段验证通过，登陆成功');
            // 点击登陆按钮这里就可以收集到的数据发送给前段
            // let params={
            //   username:this.loginForm.username,
            //   password:this .loginForm.password,
            // }
            // 这是Vue也就是this.$router一内置跳转方法push
          // this.$router.push("/")
          } else {
            console.log('前段验证失败，不能提交给后台');
            return false;
          }
        });
      },
  }
}
</script>
<style lang="less">
  .addMerchandise{
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
         .el-form-item{
           .el-form-item__content{
            .el-textarea{
              width:800px;
            }
           }

         }
       }
    }
  }
  }
}

</style>
