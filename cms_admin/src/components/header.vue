<template>
  <div class="header shadow-0">
    <a @click="menuSwitchSub">
      <i class="iconfont font30" :class="isCollapse?'icon-menu-close':'icon-menu-open'"></i>
    </a>
    <a href="/">
      <i class="iconfont icon-home font30"></i>
    </a>
    <div class="header-menu">
      <span class="el-dropdown-link">
        <i class="iconfont icon-diamond font24"></i>
      </span>
      <el-dropdown trigger="click" @command="adminMenu">
        <span class="el-dropdown-link">
          <i class="iconfont icon-user font24"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="show">
            <i class="iconfont icon-user"></i>
            信息
          </el-dropdown-item>
          <el-dropdown-item command="signOut">
            <i class="iconfont icon-exit"></i>
            退出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
export default {
  props: ["isCollapse"],
  data() {
    return {};
  },
  methods: {
    menuSwitchSub() {
      this.$emit("menuSwitch");
    },
    adminMenu(command) {
      command == "show"
        ? this.$router.push("/system/user?id=" + this.user)
        : command == "signOut" ? this.signOut() : "";
    },
    signOut(path) {
      let _this = this;
      _this
        .$confirm("是否退出登录？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          localStorage.removeItem("auth");
          _this.$router.push("/login");
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  position: relative;
  background-color: #fff;
  padding: 0 20px;
  position: relative;
  z-index: 99;
  a {
    font-size: 30px;
  }
  .header-menu {
    cursor: pointer;
    padding-top: 5px;
    float: right;
  }
}
</style>
