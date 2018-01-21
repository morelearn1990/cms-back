<template>
    <el-menu class="menu-content" :collapse='isCollapse' :router='true' unique-opened>
        <el-submenu index="/content">
            <template slot="title">
                <i class="iconfont icon-text"></i>
                <span slot="title">内容管理</span>
            </template>
            <el-menu-item index="/article">文章管理</el-menu-item>
            <el-menu-item index="/discuss">评论管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/column">
            <i class="iconfont icon-column"></i>
            <span slot="title">栏目管理</span>
        </el-menu-item>
        <el-menu-item index="/model">
            <i class="iconfont icon-model"></i>
            <span slot="title">模型管理</span>
        </el-menu-item>
        <el-menu-item index="/modular">
            <i class="iconfont icon-modular"></i>
            <span slot="title">模块管理</span>
        </el-menu-item>
        <el-menu-item index="/statistics">
            <i class="iconfont icon-statistics"></i>
            <span slot="title">统计分析</span>
        </el-menu-item>
        <el-submenu index="/system">
            <template slot="title">
                <i class="iconfont icon-setting"></i>
                <span slot="title">系统设置</span>
            </template>
            <el-menu-item-group>
                <el-menu-item index="/system/base">基本参数</el-menu-item>
                <el-menu-item index="/system/usermodel">用户模型</el-menu-item>
                <el-menu-item index="/system/user">用户管理</el-menu-item>
                <el-menu-item index="/system/db">数据库管理</el-menu-item>
                <el-menu-item index="/system/log">日志管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {
  props: ["isCollapse"],
  data() {
    return {};
  },
  methods: {
    gotoRouter(index) {
      this.$router.push("/" + index);
    }
  }
};
</script>
<style lang="less" scoped>
.el-menu {
  border-right: none;
}
.menu-content:not(.el-menu--collapse) {
  width: 200px;
}
</style>
