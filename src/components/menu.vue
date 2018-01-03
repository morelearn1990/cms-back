<template>
    <el-menu class="menu-content" unique-opened @select="gotoRouter">
        <el-submenu index="content">
            <template slot="title">
                <i class="el-icon-fa-file-text"></i>内容管理
            </template>
            <el-menu-item index="article">文章管理</el-menu-item>
            <el-menu-item index="discuss">评论管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="channel">
            <i class="el-icon-menu"></i>栏目管理
        </el-menu-item>
        <el-menu-item index="model">
            <i class="el-icon-fa-tasks"></i>模型管理
        </el-menu-item>
        <el-menu-item index="modular">
            <i class="el-icon-fa-tags"></i>模块管理
        </el-menu-item>
        <el-menu-item index="statistics">
            <i class="el-icon-fa-bar-chart"></i>统计分析
        </el-menu-item>
        <el-submenu index="system">
            <template slot="title">
                <i class="el-icon-setting"></i>系统设置
            </template>
            <el-menu-item index="system/base">基本参数</el-menu-item>
            <el-menu-item index="system/user">用户管理</el-menu-item>
            <el-menu-item index="system/usermodel">用户模型</el-menu-item>
            <el-menu-item index="system/db">数据库管理</el-menu-item>
            <el-menu-item index="system/log">日志管理</el-menu-item>
        </el-submenu>
    </el-menu>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        gotoRouter(index) {
            this.$router.push('/' + index);
        }
    }
}
</script>
<style lang="less" scoped>
.menu-content {
    height: 100%;
    overflow: hidden;
}
</style>
