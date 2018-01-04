<template>
    <div class="header shadow-1">
        <a href="#/">
            <i class="iconfont icon-home font30"></i>
        </a>
        <div class="header-menu">
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
  data() {
    return {};
  },
  methods: {
    adminMenu(command) {
      command == "show"
        ? this.$router.push("/system/user?id=" + this.user)
        : command == "signOut" ? this.signOut() : "";
    },
    signOut(path) {
      this.$confirm("是否退出登录？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "warning",
            message: "已退出"
          });
        })
        .catch(() => {
          this.$message({
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
