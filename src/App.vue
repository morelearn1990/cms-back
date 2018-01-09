<template>
    <div class="root">
        <div class="side shadow-4">
            <m-nav-menu></m-nav-menu>
        </div>
        <div class="main">
            <div class="main-header">
                <m-header></m-header>
            </div>
            <div class="main-body">
                <div class="main-breadcrumb">
                    <m-breadcrumb></m-breadcrumb>
                </div>
                <div class="main-content shadow-2">
                    <router-view></router-view>
                </div>
            </div>
            <div class="main-footer">
                <m-footer></m-footer>
            </div>
        </div>
    </div>
</template>

<script>
import mNavMenu from "./components/menu.vue";
import mHeader from "./components/header.vue";
import mFooter from "./components/footer.vue";
import mBreadcrumb from "./components/breadcrumb.vue";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    mHeader,
    mFooter,
    mNavMenu,
    mBreadcrumb
  },
  updated: function() {}
};
</script>

<style lang="less" scoped>
html,
body {
  width: 100%;
  height: 100%;
  color: #333;
}

.root {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  .side {
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    z-index: 99;
    position: relative;
    background-color: #6f767c;
    overflow-y: hidden;
  }
  .main {
    height: 100%;
    background-color: #f1f1f1;
    flex-grow: 1;
    flex-shrink: 1;
    .main-header {
      height: 50px;
      z-index: 10;
      position: relative;
    }
    .main-body {
      width: 100%;
      height: calc(~"100% - 80px");
      padding: 0 10px;
      overflow: hidden;
      .main-breadcrumb {
        height: 45px;
      }
      .main-content {
        height: calc(~"100% - 48px");
        overflow: hidden;
        background-color: #fff;
        border-radius: 5px;
      }
    }
    .main-footer {
      height: 20px;
    }
  }
}
</style>


