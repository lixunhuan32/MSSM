<template>
  <div class="itunes">
 <el-card class="box-card">
     <div slot="header" class="clearfix">
       <span class="title">账号管理</span>
     </div>
      <!-- 账号管理-->
     <div class="text item">
    <el-table
    ref="multipleTable"
    :data="tableData"
    tooltip-effect="dark"
    style="width: 100%"
    @selection-change="handleSelectionChange">
     <!-- 单选框 -->
    <el-table-column
      type="selection"
      width="70">
    </el-table-column>
       <!-- 账号 -->
    <el-table-column
      prop="username"
      label="账号"
      width="150">
    </el-table-column>
    <!-- 用户组 -->
    <el-table-column
      prop="usergroup"
      label="用户组"
     width="150">
    </el-table-column>
     <!-- 日期 -->
     <el-table-column
      label="创建日期"
      width="800px">
      <template slot-scope="scope">{{ scope.row.ctime|filterCtime }}</template>
    </el-table-column>
     <!--操作 编辑 删除按钮-->
     <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit( scope.row.id)"><i class="el-icon-edit"></i>编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete( scope.row.id)"><i class="el-icon-delete"></i>删除</el-button>
      </template>
    </el-table-column>
   </el-table>

   <!-- 分页 -->
    <!-- :page-sizes="[2, 4, 6,10]"是下拉框规定每页显示的条数
       :page-size="3" 默认显示每 页的条数
       currentPage动态绑定的数据写在data里默认显示第几页内容
       handleSizeChange当下拉框改变触发的函数
       handleCurrentChange调到当前第几页触发的函数
       :total="11"所有数据总和
       layout 包含页码，数据总条数，当前第几页，分几页显示 -->
   <div style="margin-top: 20px; text-align: left;">
     <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2, 4, 6,10]" 
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="11">
    </el-pagination>
  </div>
   <!-- 批量删除按钮 和取消选择按钮-->
    <div style="margin-top:20px; text-align:left;">
      <el-button @click="batchDelete()">批量删除</el-button>
      <el-button @click="cancelSelect()">取消选择</el-button>
    </div>

     <!-- 修改删除的模态框 -->
    <el-dialog title="账号修改" width="500px" :visible.sync="flag">
      <el-form :model="deifFrom">
      <!-- 用户名 -->
       <el-form-item label="用户名"  label-width="80px"  prop="username">
        <el-input style="width:300px;" type="text" v-model="deifFrom.username" autocomplete="off"></el-input>
       </el-form-item>
       <!-- 选择用户组 -->
      <el-form-item label="选择用户组" prop="usergroup">
      <el-select style="width:300px;"  v-model="deifFrom.usergroup" placeholder="选择用户组">
      <el-option label="普通用户" value="普通用户"></el-option>
      <el-option label="高级用户" value="高级用户"></el-option>
      </el-select>
      </el-form-item> 
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="flag= false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
 </el-card>
</div>

</template>

<script>
// 引入moment块
import moment from "moment";
import qs from "qs";
export default {
  data() {
    return {
      tableData: [],
      flag: false, //切换模态框的显示和隐藏 false表示隐藏
      deifFrom: {
        username: "",
        usergroup: ""
      },
      editid: "", //要修改的数据的id
      selestedaccount: [],
      currentPage:1,
    };
  },
  // 钩子函数
  created() {
    // // 调用请求所有账号的数据
    // this.getAccountList();
     this.getAccountListByPage();
  },
  methods: {
     handleSizeChange(val) { //当下拉框改变触发的函数也就是选择每页显示多少条数据
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {//跳到底几页触发的函数
        console.log(`当前页: ${val}`);
      },
      // 请求所有账号数据的函数
    // getAccountList() {
    //   this.axios
    //     .get("http://127.0.0.1:9999/users/accountlist")
    //     .then(response => {
    //       //  把后端返回的账号数据 赋值给用户账号表格数据来渲染页面
    //       this.tableData = response.data;
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // },
    // 按照分页显示的数据
    getAccountListByPage(){

    },
    //批量删除的函数
    batchDelete() {
      let add = this.selestedaccount; //用户点击时得到当前的数是一个数组
      //循环这个数组获取里面的id ，map方法里面的函数只有一个参数代表v值，也就是每一条数据，account是形参account.id获得id号
      let id = add.map(account => account.id);
      if (!id.length) {
        //  先判断如果没有勾选数据就结束后面的弹框
        this.$message.error("请勾选以后再操作批量删除按钮！");
        return;
      }
      // 确定勾选数据的单选框以后弹出模态框再判断是否执行操作
      this.$confirm("你确定要删除吗", "删除提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          // 把接到的id发给后台后台根据这id查数据执行删除操作的请求
          this.axios
            .get(`http://127.0.0.1:9999/users/batchdelect?idArr=${id}`)
            .then(response => {
              // 接收删除失败的错误码和提示信息
              let { error_code, reason } = response.data;
              if (error_code === 0) {
                //接收到的码为0，弹出成功的提示信息
                this.$message({
                  type: "success",
                  message: reason
                });
                this.getAccountList(); //自动刷新，再次调用请求所有数据的函数
              } else {
                //接收到的码为0，弹出成功的提示信息
                this.$message.error(reason);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          // 弹出取消删除的提示
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 取消选择的函数
    cancelSelect() {
      // 凡是用res声明的都可通过$ref.multipleTable拿dom.再调用一个取消选中的函数
      this.$refs.multipleTable.clearSelection();
    },
    // 当表单单选框发生改变时就会触发的函数 val就是选中的数据 数据是一个数组 索引为0的就是对象
    handleSelectionChange(val) {
      this.selestedaccount = val; //val就是点击当前的数据 ，把点击的数据保存到data数据中方便后面获取里面每一项的值
    },
    //删除的函数
    handleDelete(id) {
      if (!id.length) {
        //  先判断如果没有勾选数据就结束后面的弹框
        this.$message.error("请勾选以后再操作批量删除按钮！");
        return;
      }
      // 确定删除的模态框
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //  发送axios请求把id传过去
          this.axios
            .get(`http://127.0.0.1:9999/users/accountdel?id=${id}`)
            .then(response => {
              // console.log(response.data);
              // 接后台删除的错误码
              let { error_code, msg } = response.data;
              //  根据接到后台返回回来的send里的信息做判断  给成功或者失败的提示信息
              if (error_code === 0) {
                this.$message({
                  //删除成功的提示信息带颜色的提示框
                  type: "success",
                  message: msg
                });
                this.getAccountList(); //删除成功后自动刷新列表调用请求所有数据的函数
              } else {
                //删除失败的提示信息
                this.$message.error(msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(() => {
          this.$message({
            //带颜色的弹框
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑修改的函数
    handleEdit(id) {
      this.editid = id; //把id保存下来放到data里方便保存修改函数用
      this.flag = true; //点击修改时模态框显示出来 flag为true
      //  点击修改按钮传当前id过去查询当前数据
      this.axios
        .get(`http://127.0.0.1:9999/users/accountedit?id=${id}`)
        .then(response => {
          let result = response.data[0]; //接收后端返回来的数据是一个数组，索引第0项就是整个对象
          this.deifFrom.username = result.username; //把接到的数据回填到模态框 result.username;就是接到的数据
          this.deifFrom.usergroup = result.usergroup; //把接到的数据回填到模态框result.usergroup就是接到的数据
        })
        .catch(err => {
          console.log(err);
        });
    },
    //保存修改后的数据
    saveEdit() {
      // 收集修改后的数据和老的id
      let params = {
        username: this.deifFrom.username,
        usergroup: this.deifFrom.usergroup,
        editid: this.editid
      };
      // 发送axios请求
      this.axios
        .post(
          "http://127.0.0.1:9999/users/saveeditaccount",
          qs.stringify(params)
        )
        .then(response => {
          // 接收错误码和提示信息
          let { error_code, reason } = response.data;

          if (error_code === 0) {
            this.$message({
              //给成功的提示框
              type: "success",
              message: reason
            });
            this.getAccountList(); //修改成功自动刷新列表调用请求所有数据的函数
          } else {
            this.$message.error(reason); //给失败的提示框
          }
          this.flag = false; //关闭模态框
        })
        .catch(err => {
          console.log(err);
        });
    }
  },

  // 时间过滤函数 filterCtime（） 要下载moment模块 cnpm i moment
  filters: {
    filterCtime(ctime) {
      return moment(ctime).format("YYY-MM-DD HH:mm:ss");
    }
  }
};
</script>
<style lang="less">
.itunes {
  .el-card {
    .el-card__header {
      text-align: left;
      font-size: 20px;
      font-weight: 600;
      background-color: #f1f1f1;
    }
  }
}
</style>
