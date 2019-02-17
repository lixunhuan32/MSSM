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
     <!--操作 -->
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
 <!-- 修改删除的模态框 -->
    <el-dialog title="账号修改" width="500px" :visible.sync="flag">
      <el-form :model="deifFrom">
      <!-- 用户名 -->
       <el-form-item label="用户名"  label-width="80px"  prop="username">
        <el-input style="width:300px;" type="text" v-model="deifFrom.username" autocomplete="off"></el-input>
       </el-form-item>
       <!-- 选择用户组 -->
      <el-form-item label="选择用户组" prop="userGroup">
      <el-select style="width:300px;"  v-model="deifFrom.userGroup" placeholder="选择用户组">
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
import moment from 'moment';
import qs from 'qs';
export default {
  data(){
    return{
         tableData:[],
         flag:false, //切换模态框的显示和隐藏 false表示隐藏
         deifFrom:{
           username:'',
           userGroup:'',
         },
         editId:"",//要修改的数据的id
    }
  },
  created(){
   this.getAccountList();
  },
    methods:{
      // 请求所有账号数据的函数
      getAccountList(){
            this.axios.get("http://127.0.0.1:9999/users/accountlist")
        .then(response=>{
          //  把后端返回的账号数据 赋值给用户账号表格数据来渲染页面
          this.tableData=response.data
        })
        .catch(err=>{
          console.log(err)
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      // 删除的函数
       handleDelete(id){
        // 确定删除的模态框
            this.$confirm('你确定要删除吗？','提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(()=>{
                  //  发送axios请求把id传过去
            this.axios.get(`http://127.0.0.1:9999/users/accountdel?id=${id}`)
            .then(response=>{
              // console.log(response.data);
              // 接后台删除的错误码
            let {error_code, msg} = response.data;
            //  根据接到后台返回回来的send里的信息做判断  给成功或者失败的提示信息
            if(error_code===0){
                this.$message({  //删除成功的提示信息
                      type:"success",
                      message:msg
            });
              this.getAccountList();  //删除成功后自动刷新列表调用请求所有数据的函数
            }else{  //删除失败的提示信息
            this.$message.error(msg)
            }
            })
            .catch(err=>{
            console.log(err)
            })    
          })
          .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
      // 编辑修改的函数
      handleEdit(id){ 
       this.editId=id //把id保存下来放到data里方便保存修改函数用
        this.flag=true; //点击修改时模态框显示出来 flag为true
        //  点击修改按钮传当前id过去查询当前数据
        this.axios.get(`http://127.0.0.1:9999/users/accountedit?id=${id}`)
        .then(response=>{
        let result=response.data[0]; //接收后端返回来的数据是一个数组，索引第0项就是整个对象
       this.deifFrom.username=result.username; //把接到的数据回填到模态框 result.username;就是接到的数据
       this.deifFrom.userGroup=result.usergroup //把接到的数据回填到模态框result.usergroup就是接到的数据
        })
        .catch(err=>{
          console.log(err)
        })
       },
      //  保存修改后的数据
      saveEdit(){
        // 收集修改后的数据和老的id
        let params={
          username:this.deifFrom.username,
          usergroup:this.deifFrom.userGroup,
          editid:this.editId,
        }
        // 发送axios请求
        this.axios.post('http://127.0.0.1:9999/users/saveeditaccount',qs.stringify(params))
        .then(response=>{
          console.log(response.data)
        })
        .catch(err=>{
          console.log(err)
        })
        // console.log(params)

        // this.flag=true;
      }

    },


  // 时间过滤函数 要下载moment模块 cnpm i moment
  filters:{
   filterCtime(ctime){
    return moment(ctime).format('YYY-MM-DD HH:mm:ss')
    }
  },
}
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
    // .el-card__body {
       
      
    // }
  }
}

</style>
