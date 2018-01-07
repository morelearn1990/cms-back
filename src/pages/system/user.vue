<template>
    <div class="user">
        <el-table :data="userlist" height="table-style" stripe border size='mini' class="table-style">
            <el-table-column prop="userId" label="ID" width="50"></el-table-column>
            <el-table-column prop="name" label="用户姓名" min-width="100"></el-table-column>
            <el-table-column prop="userName" label="登录名" min-width="100"></el-table-column>
            <el-table-column prop="userTypeName" label="用户类型" min-width="100"></el-table-column>
            <el-table-column label="操作" width="250">
                <template slot-scope="scope">
                    <el-button size="mini" @click="userEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="userDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="btn-row">
            <el-button type="primary" size='mini' @click="userAdd()">新增</el-button>
        </div>
        <el-dialog title="编辑用户模型" :visible.sync="editing">
            <el-row class="input-group">
                <el-col :span='6' class="input-label">
                    <span>姓名</span>
                </el-col>
                <el-col :span='12' class="input-control">
                    <el-input v-model="edit.name" placeholder="请输入用户姓名"></el-input>
                </el-col>
            </el-row>
            <el-row class="input-group">
                <el-col :span='6' class="input-label">
                    <span>登录名</span>
                </el-col>
                <el-col :span='12' class="input-control">
                    <el-input v-model="edit.userName" placeholder="请输入用户登录名"></el-input>
                </el-col>
            </el-row>
            <el-row class="input-group">
                <el-col :span='6' class="input-label">
                    <span>用户类型</span>
                </el-col>
                <el-col :span='12' class="input-control">
                    <el-select v-model="edit.userTypeId" placeholder="请选择用户类型">
                        <el-option v-for="item in userType" :key="item.userTypeId" :label="item.userTypeName" :value="item.userTypeId"></el-option>
                    </el-select>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="userCancel()">取 消</el-button>
                <el-button type="primary" @click="userChange()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<style lang="less" scoped>
.user {
  height: 100%;
  width: 100%;
  padding: 10px;
  overflow: scroll;
  .table-style {
    width: 99%;
    height: calc(~"100% - 60px");
  }
  .btn-row {
    padding: 10px;
  }
}
</style>
<script>
export default {
  data: function() {
    return {
      userlist: [],
      err: "",
      edit: {},
      editDefault: {
        userId: "",
        name: "",
        userName: "",
        userTypeId: ""
      },
      index: null,
      userType: [],
      editing: false
    };
  },
  created: function() {
    var _this = this;
    _this.axios
      .get("/system/user")
      .then(res => {
        _this.userlist = res.data.userlist;
      })
      .catch(err => {
        _this.err = err.toString();
      });
    _this.axios
      .get("/system/usermodel")
      .then(res => {
        _this.userType = res.data.usermodellist;
      })
      .catch(err => {
        _this.err = err.toString();
      });
  },
  methods: {
    userEdit(index, row) {
      this.edit = row;
      this.editing = true;
      this.index = index;
    },
    userAdd() {
      this.edit = this.editDefault;
      this.editing = true;
    },
    userCancel() {
      this.edit = this.editDefault;
      this.editing = false;
      this.index = null;
    },
    userChange() {
      console.log("aa");
      var _this = this;
      _this.edit.userId == ""
        ? _this.axios
            .put("/system/user/add", _this.edit)
            .then(res => {
              if (res.data.result == true) {
                _this.edit = editDefault;
                _this.$message({
                  type: "success",
                  message: "新增成功~~"
                });
                _this.userlist.push(res.data.user);
                this.editing = false;
              } else {
                _this.$message({
                  type: "error",
                  message: "新增失败~~"
                });
              }
            })
            .catch(err => {
              _this.err = err.toString();
              _this.$message({
                type: "error",
                message: "新增失败~~"
              });
            })
        : _this.axios
            .post("/system/user/edit", _this.edit)
            .then(res => {
              if (res.data.result == true) {
                _this.edit = editDefault;
                _this.$message({
                  type: "success",
                  message: "编辑成功~~"
                });
                _this.userlist.splice(_this.index, 1, res.data.user);
                _this.index = null;
                this.editing = false;
              } else {
                _this.$message({
                  type: "error",
                  message: "编辑失败~~"
                });
              }
            })
            .catch(err => {
              _this.err = err.toString();
              _this.$message({
                type: "error",
                message: "新增失败~~"
              });
            });
    },
    userDelete(index, row) {
      var _this = this;
      _this
        .$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.axios
            .delete("/system/user/delete", {
              userTypeId: row.userId
            })
            .then(res => {
              res.data.result != true || _this.userlist.splice(index, 1);
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
