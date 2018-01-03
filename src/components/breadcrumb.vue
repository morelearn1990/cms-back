<template>
    <div class="breadcrumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item v-for="item of breadcrumbs" :key="item.name" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    computed: {
        breadcrumbs() {
            var paths = this.$route.matched;
            if (paths.length === 1 && paths[0].path === '') {
                paths = [];
            }
            return paths;
        }
    }
}
</script>
<style lang="less" scoped>
.breadcrumbs {
    padding: 15px 0;
}
</style>

