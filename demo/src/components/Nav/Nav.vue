<template>
     <el-menu
                        
                        default-active="2"
                    
                        class="el-menu-vertical-demo"
                        @open="handleOpen"
                        @close="handleClose"
                        background-color="#2d3a4b"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        router
                        >
                <!-- 导航一 -->
                <el-submenu index="1">
                    <template slot="title">
                    <i class="el-icon-setting"></i>
                    <span>系统管理</span>
                    </template>
                    <el-menu-item index="/">系统信息</el-menu-item>
                </el-submenu>
              <!-- 导航二 -->
              <el-submenu index="2">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>账号管理</span>
                    </template>
                    <el-menu-item index="iTunes">账号管理</el-menu-item>
                    <el-menu-item index="addAccount">添加账号</el-menu-item>
                    <el-menu-item index="ModifyAccount"> 密码修改 </el-menu-item>
                </el-submenu>
                <!-- 导航三 -->
              <el-submenu index="3">
                    <template slot="title">
                    <i class="el-icon-goods"></i>
                    <span>商品管理</span>
                    </template>
                    <el-menu-item index="commodityManagement">商品管理</el-menu-item>
                    <el-menu-item index="addMerchandise">添加商品</el-menu-item>
                  
                </el-submenu>
                <!-- 导航四-->
                <el-submenu index="4">
                    <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>统计管理</span>
                    </template>
                    <el-menu-item index="DBS">统计管理 </el-menu-item>
                    <el-menu-item index="SalesStatistics">销售统计</el-menu-item>
                </el-submenu>
                </el-menu>
            
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>
<style>
.el-menu {
  border: none;
}
</style>

