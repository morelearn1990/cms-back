<template>
    <el-row class="layout-main">
        <m-header></m-header>
        <el-col :xs="layoutSm.left" :sm="layoutSm.left" :md="3" class="layout-left">
            <m-nav-menu></m-nav-menu>
        </el-col>
        <el-col :xs="layoutSm.right" :sm="layoutSm.right" :md="21" class="layout-right">
            <div class="layout-breadcrumb">
                <m-breadcrumb></m-breadcrumb>
            </div>
            <el-col class="layout-content">
                <router-view></router-view>
            </el-col>
            <el-col class="layout-footer">
                <m-footer></m-footer>
            </el-col>
        </el-col>
    </el-row>
</template>

<script>
import mNavMenu from './components/menu.vue'
import mHeader from './components/header.vue'
import mFooter from './components/footer.vue'
import mBreadcrumb from './components/breadcrumb.vue'

export default {
    data() {
        return {
            layoutSm: {
                left: 4,
                right: 20
            }
        }
    },
    methods: {

    },
    components: {
        mHeader,
        mFooter,
        mNavMenu,
        mBreadcrumb
    }
}
</script>

<style lang="less" scoped>
html,
body {
    width: 100%;
    height: 100%;
    color: #333;
}

.layout-main {
    width: 100%;
    height: 100%;
    position: relative;
    .layout-left {
        height: calc(~"100% - 50px");
    }
    .layout-right {
        height: calc(~"100% - 50px");
        background-color: #fdfdff;
        .layout-breadcrumb {
            height: 40px;
            padding: 0 10px;
        }
        .layout-content {
            height: calc(~"100% - 60px");
            padding: 0 10px;
            overflow: hidden;
        }
        .layout-footer {
            height: 20px;
        }
    }
}
</style>


