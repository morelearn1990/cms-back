<template>
    <div class="header">
        <a href="#">
            <i class="el-icon-fa-home"></i>
        </a>
        <div class="header-menu">
            <el-dropdown trigger="click" @command="adminMenu">
                <span class="el-dropdown-link">
                    admin
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="show">
                        <i class="el-icon-fa-user"></i>查看个人信息
                    </el-dropdown-item>
                    <el-dropdown-item command="signOut">
                        <i class="el-icon-fa-sign-out"></i>退出
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        adminMenu(command) {
            command == 'show' ? this.$router.push('/system/user?id=' + this.user) : command == 'signOut' ? this.signOut() : ''
        },
        signOut(path) {
            this.$confirm('是否退出登录？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'warning',
                    message: '已退出'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消退出'
                });
            });
        }
    }
}
</script>
<style lang="less" scoped>
.header {
    width: 100%;
    height: 50px;
    position: relative;
    background-color: #fff;
    padding: 0 20px;
    box-shadow: 0 2px 5px #666;
    position: relative;
    z-index: 99;
    a {
        font-size: 30px;
    }
    .header-menu {
        cursor: pointer;
        padding-top: 15px;
        float: right;
    }
}
</style>
