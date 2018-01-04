<template>
    <div class="model-list" v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="text">
        <div class="btn-group">
            <el-button type="primary" size="small" @click="modelEdit('new')">新增模型</el-button>
        </div>
        <el-table ref="multipleTable" :data="modelLists" border stripe style="width: 100%;">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" width="120" align="center"></el-table-column>
            <el-table-column prop="type" label="类型" width="120" align="center"></el-table-column>
            <el-table-column prop="builder" label="创建者" width="120" align="center"></el-table-column>
            <el-table-column prop="description" label="描述" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="操作" width="140" align="center">
                <template slot-scope="scope">
                    <el-button size="small" @click="modelEdit(scope.row.id)">编辑</el-button>
                    <el-button size="small" type="danger" @click="modelDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
  data() {
    return {
      fullscreenLoading: false,
      text: "正在拼命删除~~",
      modelLists: []
    };
  },
  methods: {
    modelEdit(id) {
      this.$router.push("/model/edit?id=" + id);
    },
    modelDelete(index, row) {
      this.$confirm("此操作将永久删除该模型, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          row.type == "default"
            ? this.$message({
                type: "error",
                message: "默认模型不能被删除"
              })
            : this.modelDeleteAxios(index, row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    modelDeleteAxios(index, id) {
      this.fullscreenLoading = true;
      this.axios
        .delete("/model/delete", {
          data: {
            id
          }
        })
        .then(res => {
          this.modelLists.splice(index, 1);
          this.fullscreenLoading = false;
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(res => {
          this.fullscreenLoading = false;
          this.$message({
            type: "error",
            message: "删除失败"
          });
        });
    }
  },
  beforeRouteEnter(to, from, next) {
    next(self => {
      self.axios
        .get("/model/list")
        .then(res => {
          self.modelLists = res.data.lists;
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
};
</script>
<style lang="less">
.model-list {
  height: 100%;
  .btn-group {
    height: 40px;
    padding: 5px;
  }
  .el-table {
    height: calc(~"100% - 50px");
    .el-table__body-wrapper {
      height: calc(~"100% - 42px");
    }
  }
}
</style>
