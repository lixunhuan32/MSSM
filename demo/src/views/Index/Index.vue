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
        <el-footer>
          <Button></Button>
        </el-footer>
      </el-container>
    </el-container> 
 </div>
</template>
<script>
import Nav from '@/components/Nav/Nav.vue';
import Top from '@/components/Top/Top.vue';
import Button from '@/components/Button/Button.vue';
export default {
    components: {  // 注册组件
        Nav,
        Top,
        Button,
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
      background-color: #fff;
      color: #333;
    }
    // 右侧内容容器
    .el-main {
      background-color: #fff;
      color: #333;
      text-align: center;
     
    }
  }
}
</style>
