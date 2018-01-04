<template>
    <el-row class="layout-main">
        <m-header></m-header>
        <el-col :xs="0" :sm="4" :md="3" class="layout-left">
            <m-nav-menu :isCollapse='isCollapse'></m-nav-menu>
        </el-col>
        <el-col :xs="22" :sm="20" :md="21" class="layout-right">
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
import mNavMenu from "./components/menu.vue";
import mHeader from "./components/header.vue";
import mFooter from "./components/footer.vue";
import mBreadcrumb from "./components/breadcrumb.vue";

export default {
  data() {
    return {
      isCollapse: false
    };
  },
  methods: {},
  components: {
    mHeader,
    mFooter,
    mNavMenu,
    mBreadcrumb
  },
  mounted: function() {
    var _this = this;
    window.onresize = function() {
      window.innerWidth < 992
        ? (_this.isCollapse = true)
        : (_this.isCollapse = false);
    };
  }
};
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


