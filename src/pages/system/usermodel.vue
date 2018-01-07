<template>
    <div class="user-model">
        <el-table :data="userModelList" height="table-style" stripe border size='mini' class="table-style">
            <el-table-column prop="userTypeId" label="ID" width="50"></el-table-column>
            <el-table-column prop="userTypeName" label="用户类型名" min-width="100"></el-table-column>
            <el-table-column prop="userType" label="用户类型" min-width="100"></el-table-column>
            <el-table-column prop="userTypeRight" label="操作权限" min-width="100"></el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button size="mini" :disabled="scope.row.userTypeDefault" @click="userModelEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button size="mini" :disabled="scope.row.userTypeDefault" type="danger" @click="userModelDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑用户模型" :visible.sync="editing">
            这是编辑界面
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
.user-model {
  height: 100%;
  width: 100%;
  padding: 10px;
  overflow: scroll;
  .table-style {
    width: 99%;
    height: calc(~"100% - 60px");
  }
}
</style>
<script>
export default {
  data: function() {
    return {
      userModelList: [],
      err: "",
      edit: {},
      editing: false
    };
  },
  created: function() {
    var _this = this;
    _this.axios
      .get("/system/usermodel")
      .then(res => {
        _this.userModelList = res.data.usermodellist;
      })
      .catch(err => {
        _this.err = err.toString();
      });
  },
  methods: {
    userModelEdit(index, row) {
      this.edit = row;
      this.editing = true;
    },
    userModelDelete(index, row) {
      var _this = this;
      row.userTypeDefault == true
        ? _this.$message({ type: "error", message: "默认模型不能删除哦~~" })
        : _this
            .$confirm("此操作将永久删除该用户模型, 是否继续?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
            .then(() => {
              _this.axios
                .delete("/system/usermodel/delete", {
                  userTypeId: row.userTypeId
                })
                .then(res => {
                  res.data.result != true ||
                    _this.userModelList.splice(index, 1);
                  _this.$message({ type: "success", message: "删除成功~~" });
                })
                .catch(err => {
                  _this.err = err.toString();
                  _this.$message({ type: "error", message: "发生错误，请联系查找bug~~" });
                });
            })
            .catch(() => {
              _this.$message({ type: "error", message: "已经取消~~" });
            });
    }
  }
};
</script>
