<template>
    <div class="root">
        <div class="header shadow-2">
            <m-header @menuSwitch='menuSwitchUp' :isCollapse="isCollapse"></m-header>
        </div>
        <div class="breadcrumb">
            <m-breadcrumb></m-breadcrumb>
        </div>
        <div class="main">
            <div class="main-side shadow-2">
                <menu-nav :isCollapse="isCollapse"></menu-nav>
            </div>
            <div class="main-body">
                <div class="main-content shadow-2">
                    <router-view></router-view>
                </div>
                <div class="main-footer">
                    <m-footer></m-footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import menuNav from "./components/menu-nav.vue";
// import mNavMenu from "./components/menu.vue";
import mHeader from "./components/header.vue";
import mFooter from "./components/footer.vue";
import mBreadcrumb from "./components/breadcrumb.vue";

export default {
  data() {
    return {
      isCollapse: true
    };
  },
  methods: {
    menuSwitchUp() {
      this.isCollapse = !this.isCollapse;
    }
  },
  components: {
    mHeader,
    mFooter,
    // mNavMenu,
    mBreadcrumb,
    menuNav
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
  background-color: #f1f1f1;

  .header {
    height: 50px;
    position: relative;
    z-index: 99;
  }
  .breadcrumb {
    padding-left: 20px;
    height: 45px;
  }
  .main {
    display: flex;
    flex-flow: row nowrap;
    height: calc(~"100% - 100px");
    flex-grow: 1;
    flex-shrink: 1;
    overflow: hidden;
  }
  .main-side {
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
    position: relative;
    border-top-right-radius: 5px;
    background-color: #fff;
  }
  .main-body {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    overflow: hidden;
  }
  .main-content {
    height: calc(~"100% - 20px");
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
  }
  .main-footer {
    height: 20px;
  }
}
</style>


