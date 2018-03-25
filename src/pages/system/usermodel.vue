<template>
    <div class="user-model">
        <el-table :data="userModelList" height="table-style" stripe border size='mini' class="table-style">
            <el-table-column type="index" label="序号" width="60"></el-table-column>
            <el-table-column prop="name" label="用户类型名" min-width="100"></el-table-column>
            <el-table-column prop="cname" label="用户类型" min-width="100"></el-table-column>
            <el-table-column :formatter="operation" label="操作权限" min-width="100"></el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button size="mini" :disabled="scope.row.userTypeDefault" @click="userModelEdit(scope.$index,scope.row)" disabled>编辑</el-button>
                    <el-button size="mini" :disabled="scope.row.userTypeDefault" type="danger" @click="userModelDelete(scope.$index,scope.row)" disabled>删除</el-button>
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
    _this.$axios_wrapper('usermodels.list').then(res => {
        console
        _this.userModelList = res.data.userModelDocs;
      })
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
                  _this.$message({ type: "error", message: "暂时不提供这个功能~~" });
            })
            .catch(() => {
              _this.$message({ type: "error", message: "已经取消~~" });
            });
    },
    operation(row,column){
        let op = row.operationPermissions
        op = op.map(item => item.cname)
        return op.join(",")
    }
  }
};
</script>
