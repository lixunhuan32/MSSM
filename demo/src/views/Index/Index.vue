<template>
 <div class="index">
        <!-- 整个内容容器 -->
    <el-container>
            <!-- 左侧 -->
                    <el-aside width="200px">
                    
                       <Nav></Nav>

        </el-aside>
       <!-- 右侧 -->
        <el-container>
        <!-- 右侧头部 -->
        <el-header>
          <Top></Top>
          </el-header>
        <!-- 右侧中部 -->
        <el-main>
          <router-view></router-view>
        </el-main>
        <!-- 右侧尾部 -->
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container> 
 </div>
</template>
<script>
import Nav from '@/components/Nav/Nav.vue';
import Top from '@/components/Top/Top.vue';
export default {
    components: {  // 注册组件
        Nav,
        Top,
       
    },
     methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    
};
</script>

<style lang="less">
.index {
  height: 100%;
//   整个大容器
  .el-container {
    height: 100%;
    // 左边整个大容器
    .el-aside {
      background-color: #2d3a4b;
      color: #333;
      text-align: center;
      
      
    }
    // 右侧头部和尾部
    .el-header,
    .el-footer {
      background-color: #b3c0d1;
      color: #333;
      text-align: center;
      
    }
    // 右侧内容容器
    .el-main {
      background-color: #e9eef3;
      color: #333;
      text-align: center;
     
    }
  }
}
</style>
