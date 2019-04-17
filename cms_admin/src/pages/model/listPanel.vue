<template>
    <div class="model-list" v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="text">
        <div class="btn-group">
            <el-button type="primary" size="small" @click="modelEdit('new')">新增模型</el-button>
        </div>
        <el-table ref="multipleTable" :data="list" size="mini" border stripe height="table-style" class="table-style">
            <el-table-column type="index" label="序号" width="60" align="left"></el-table-column>
            <el-table-column prop="name" label="名称" min-width="35" align="left"></el-table-column>
            <el-table-column prop="builder" label="创建者" min-width="20" align="left"></el-table-column>
            <el-table-column prop="description" label="描述" min-width="50" align="left" show-overflow-tooltip></el-table-column>
            <el-table-column prop="" label="操作" width="150" align="left">
                <template slot-scope="scope">
                    <el-button size="mini" @click="modelEdit(scope.row._id)">{{scope.row.classify == 'default'?'查看':'编辑'}}</el-button>
                    <el-button size="mini" v-if="scope.row.type != 'default'" type="danger" @click="modelDeleteAsk(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="less">
.model-list {
  width: 100%;
  height: 100%;
  .btn-group {
    height: 40px;
  }
  .table-style {
    width: 99%;
    height: calc(~"100% - 40px");
  }
}
</style>
<script>
export default {
  props: ["list"],
  data() {
    return {
      fullscreenLoading: false,
      text: "正在拼命删除~~",
      modelLists: []
    };
  },
  methods: {
    modelEdit(id) {
      var _this = this;
      _this.$router.push({
        path: `/model/edit/${id}`
      });
    },
    modelDeleteAsk(index, row) {
      var _this = this;
      _this
        .$confirm("此操作将永久删除该模型, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
        .then(() => {
          row.classify == "default"
            ? _this.$message({
                type: "error",
                message: "默认模型不能被删除"
              })
            : _this.$emit("delete", row);
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>