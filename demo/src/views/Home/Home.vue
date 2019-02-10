<template>
  <div class="home">

  <el-card class="box-card">
     <div slot="header" class="clearfix">
       <span class="title">系统信息</span>
     </div>
      <!-- 提示的警告信息一 -->
     <div class="text item">
       <el-alert
        title="商品总数: 500, 已销售总金额: 998.00, 库存商品总价: 9800.00"
       type="success"
       show-icon>
  </el-alert>
  <!-- 提示的警告信息2  -->
  <el-alert
    title="导入数据"
    type="warning"
    show-icon>
  </el-alert>
   <!-- 内容表格部分 -->
   <el-row  :gutter="20">
     <!-- 内容左侧表格 -->
    <el-col :span="12">
     <div>
       <el-card class="box-card">
       <div slot="header" class="clearfix">
         <span>销售排行榜</span>
       </div>
       <div  class="text item">
           <!-- 内容左侧表格内容 -->
            <el-table
         :data="tableData"
         style="width: 100%">
         <!-- 商品名称 -->
         <el-table-column
        prop="goodsName"
        label="商品名称"
      >
      </el-table-column>
      <!-- 销量 -->
      <el-table-column
        prop="sales"
        label="销量"
       >
      </el-table-column>
    </el-table>
       </div>
       </el-card>
    </div>
    </el-col>
     <el-col :span="12">
       <!-- 内容右侧表格 -->
       <div>
          <el-card class="box-card">
         <div slot="header" class="clearfix">
          <span>缺货商品</span>
          </div>
          <div  class="text item">
           <!-- 内容右侧表格内容 -->
            <el-table
            :data="stockoutData"
             style="width: 100%">
         <!-- 商品名称 -->
         <el-table-column
        prop="goodsName"
        label="商品名称"
       >
      </el-table-column>
      <!-- 库存-->
      <el-table-column
        prop="stock"
        label="库存"
        >
      </el-table-column>
      <!-- 操作 -->
       <el-table-column label="操作">
        <template slot-scope="scope">
        <el-button  type="text" size="small">入库</el-button>
       </template>
      </el-table-column>
    </el-table>
          </div>
          </el-card>  
      </div>
       </el-col>
   </el-row>
     </div>
  </el-card>
  </div>

</template>

<script>

export default {
   data(){
     return{
       tableData: [
        {goodsName: '牙膏',
        sales: '8',  },
        {goodsName: '洗发水',
        sales: '2',  },
        {goodsName: '沐浴露',
        sales: '1',  },
        {goodsName: '洗面奶',
        sales: '10',  },
          ],
          // 缺货商品数据
          stockoutData:[
             {goodsName: '牙膏',
             stock: '3',  },
               {goodsName: '洗发水',
             stock: '7',  },
               {goodsName: '沐浴露',
             stock: '11',  },
             {goodsName: '洗面奶',
             stock: '0',  },
               
          ]
        }
      }
    }
  </script>
<style lang="less">
.home {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
    .el-card__body{
      .text{
       .el-alert{
         margin-bottom: 25px;
      }
      .el-table{
        .el-table__body{
          .el-table_2_column_5{
            .cell{
              height:23px;
            }
          }
        }
      }
    }
  }
  }
}
</style>

