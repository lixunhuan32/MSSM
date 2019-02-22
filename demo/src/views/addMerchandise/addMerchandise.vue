<template>
    <div class="goods-add">
        <!-- 面板组件 -->
       <el-card class="box-card">
            <!-- 面板标题 -->
            <div slot="header" class="clearfix">
                <span>添加商品</span>
            </div>

            <!-- 面板主体 -->
            <div class="text item">
                <!-- 添加账号表单 -->
                 <!-- 添加账户表单 -->
                    <el-form :model="addGoodsForm" status-icon :rules="rules" ref="addGoodsForm" label-width="100px" class="demo-ruleForm">
                        <!-- 所属分类 -->
                        <el-form-item label="请选择分类" prop="cateName">
                            <el-select v-model="addGoodsForm.cateName" placeholder="请选择分类">
                                <el-option label="酒水类" value="酒水类"></el-option>
                                <el-option label="水果类" value="水果类"></el-option>
                                <el-option label="电子类" value="电子类"></el-option>
                                <el-option label="食品类" value="食品类"></el-option>
                                <el-option label="生活用品" value="生活用品"></el-option>
                            </el-select>
                        </el-form-item>

                        <!-- 条形码 -->
                        <el-form-item label="条形码" prop="barCode">
                            <el-input type="text" v-model="addGoodsForm.barCode" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 商品名称 -->
                        <el-form-item label="商品名称" prop="goodsName">
                            <el-input type="text" v-model="addGoodsForm.goodsName" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 商品进价 -->
                        <el-form-item label="商品进价" prop="costPrice">
                            <el-input type="text" v-model.number="addGoodsForm.costPrice" @blur="autoPrice"></el-input>
                        </el-form-item>
                        <!-- 商品市场价 -->
                        <el-form-item label="商品市场价" prop="marketPrice">
                            <el-input type="text" v-model.number="addGoodsForm.marketPrice" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 商品售价 -->
                        <el-form-item label="商品售价" prop="salePrice">
                            <el-input type="text" v-model.number="addGoodsForm.salePrice" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 入库数量 -->
                        <el-form-item label="入库数量" prop="goodsNum">
                            <el-input type="text" v-model.number="addGoodsForm.goodsNum" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 商品重量 -->
                        <el-form-item label="商品重量" prop="goodsWeight">
                            <el-input type="text" v-model.number="addGoodsForm.goodsWeight" autocomplete="off"></el-input>
                        </el-form-item>
                        <!-- 商品单位 -->
                        <el-form-item label="选择单位" prop="unit">
                            <el-select v-model="addGoodsForm.unit" placeholder="选择单位">
                                <el-option label="个" value="个"></el-option>
                                <el-option label="件" value="件"></el-option>
                                <el-option label="盒" value="盒"></el-option>
                                <el-option label="斤" value="斤"></el-option>
                                <el-option label="袋" value="袋"></el-option>
                                <el-option label="瓶" value="瓶"></el-option>
                                <el-option label="箱" value="箱"></el-option>
                            </el-select>
                        </el-form-item>
                        <!-- 会员优惠 -->
                        <el-form-item label="会员优惠">
                            <el-radio-group v-model="addGoodsForm.discount">
                                <el-radio label="享受"></el-radio>
                                <el-radio label="不享受"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- 是否促销 -->
                        <el-form-item label="是否促销">
                            <el-radio-group v-model="addGoodsForm.promotion">
                                <el-radio label="促销"></el-radio>
                                <el-radio label="不促销"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- 商品描述 -->
                        <el-form-item label="商品描述">
                            <el-input type="textarea" v-model="addGoodsForm.goodsDesc"></el-input>
                        </el-form-item>

                        <!-- 添加按钮 -->
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('addGoodsForm')">添加</el-button>
                            <el-button @click="resetForm('addGoodsForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
            </div>
        </el-card>
    </div>
</template>
<script>

import qs from 'qs';

export default {
  data() {
    return {
      // 登录表单数据对象
      addGoodsForm: {
        cateName: "",
        barCode: "",
        goodsName: "",
        costPrice: "",
        marketPrice: "",
        salePrice: "",
        goodsNum: "",
        goodsWeight: "",
        unit: "",
        discount: "",
        promotion: "",
        goodsDesc: ""
      },
      // 验证的字段
      rules: {
        // 验证分类名称
        cateName: [
          { required: true, message: "账号不能为空", trigger: "blur" }, // 非空验证
          {
            min: 3,
            max: 6,
            message: "长度必须 3 到 6 个字符",
            trigger: "change"
          } // 长度验证
        ],
        // 条形码
        barCode: [
          { required: true, message: "条形码不能为空", trigger: "blur" } // 非空验证
        ],
        // 商品名称
        goodsName: [
          { required: true, message: "商品名称不能为空", trigger: "blur" } // 非空验证
        ],
        // 商品进价
        costPrice: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 市场价
        marketPrice: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 售价
        salePrice: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 入库数量
        goodsNum: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 商品重量
        goodsWeight: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 单位
        unit: [
          { required: true, message: "不能为空", trigger: "change" } // 非空验证
        ],
        // 是否打折
        discount: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 是否促销
        promotion: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ],
        // 商品描述
        goodsDesc: [
          { required: true, message: "不能为空", trigger: "blur" } // 非空验证
        ]
      }
    };
  },
  methods: {
    // 获取进价的函数
    autoPrice () {
       this.addGoodsForm.marketPrice = this.addGoodsForm.costPrice * 3;
       this.addGoodsForm.salePrice = this.addGoodsForm.costPrice * 2;
    },
    // 表单提交触发的函数
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 收集参数
          let params = {
                cateName: this.addGoodsForm.cateName,
                barCode: this.addGoodsForm.barCode,
                goodsName: this.addGoodsForm.goodsName,
                costPrice: this.addGoodsForm.costPrice,
                marketPrice: this.addGoodsForm.marketPrice,
                salePrice: this.addGoodsForm.salePrice,
                goodsNum: this.addGoodsForm.goodsNum,
                goodsWeight: this.addGoodsForm.goodsWeight,
                unit: this.addGoodsForm.unit,
                discount: this.addGoodsForm.discount,
                promotion: this.addGoodsForm.promotion,
                goodsDesc: this.addGoodsForm.goodsDesc,
          };
            //  console.log(params)
            // 发送ajax请求  把数据发送给后端
            this.axios.post("/goods/goodsadd", qs.stringify(params) )
              .then(response => {
                 console.log(response.data);
                // 接收后端返回的错误码 和 提示信息
              let { error_code,  reason } = response.data;

              // 根据后端响应的数据判断
              if (error_code === 0) {
                // 弹出成功的提示
                this.$message({
                  type: 'success',
                  message: reason
                });

                // 跳转到账号管理列表
                this.$router.push('/commodityManagement')
              } else {
                // 弹出失败的提示
                this.$message.error(reason);
              }
              })
              .catch(err => {
                  console.log('err');
              })
        } else {
          console.log("前端验证不通过, 不能发送");
          return false;
        }
      });
    },
    // 重置表单触发的函数
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};

</script>
<style lang="less">
.goods-add {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body {
        text-align: left;
      .el-form {
        width: 290px;
        .el-form-item {
            margin-bottom: 24px;
        }
      }
    }
  }
}
</style>


