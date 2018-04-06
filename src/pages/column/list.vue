<template>
  <div class="column">
    <div class="column-bar">
      <el-button type="success" size='mini' @click="columnEdit('new')">新增顶级栏目</el-button>
    </div>
    <div class="column-body">
      <el-tree :data="columns" accordion :props="defaultProps" node-key="columnId" :default-expand-all='false' :expand-on-click-node="false">
        <span class="node_content" slot-scope="{ node, data }">
          <span>
            <span class="color-gray">{{data.cname}}</span>
            <!-- <span class="color-primary">(ID: {data.columnId}) </span>
            <span class="color-success">[文档: {data.total}]</span> -->
          </span>
          <span>
            <el-button type="text" size="mini" class="color-success" @click="()=> toArticleList(data)"> 预览
            </el-button>
            <el-button type="text" size="mini" class="color-primary" @click="()=> columnEdit('new', data)"> 新增子类
            </el-button>
            <el-button type="text" size="mini" class="color-warning" @click="()=> columnEdit('edit', data)"> 修改
            </el-button>
            <el-button type="text" size="mini" class="color-danger" @click="()=> columnRemove(node, data)"> 删除
            </el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>
<style lang="less">
.column {
  padding: 10px;
  height: 100%;
  overflow: hidden;
  .column-bar {
    height: 40px;
  }
  .column-body {
    height: calc(~"100% - 40px");
    overflow-y: scroll;
    border: 1px solid #ebeef5;
  }
  .el-tree-node__content {
    height: 39px;
  }
  .node_content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    // border-bottom: 1px solid #ddd;
  }
}
</style>
<script>
import toTree from "@/utils/toTree.js";
export default {
  data() {
    return {
      columns: [],
      defaultProps: {
        children: "children"
      }
    };
  },
  mounted: function() {
    this.$axios_wrapper("columns.list").then(res => {
      this.columns = toTree(res.data.columns, "_id", "parentColumn");
    });
  },
  methods: {
    columnEdit(id, data) {
      id == "new"
        ? this.$router.push(
            `/column/edit/new?parentColumnId=${data ? data._id : ""}`
          )
        : this.$router.push(`/column/edit/${data._id}`);
    },
    toArticleList(data) {
      var id = data._id;
      this.$router.push({ path: "/article", query: { column: id } });
    },
    columnRemove(node, data) {
      var _this = this;
      _this
        .$confirm("此操作将永久删除该栏目及其子栏目, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          _this.axios
            .delete("/column/delete")
            .then(res => {
              if (res.data.result) {
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
                _this.$message({
                  type: "success",
                  message: "删除成功~~"
                });
              } else {
                throw "服务器删除失败~~";
              }
            })
            .catch(err => {
              _this.err = err.toString();
              _this.$message({
                type: "error",
                message: "删除失败~~"
              });
            });
        })
        .catch(() => {
          _this.$message({
            type: "warning",
            message: "取消删除~~"
          });
        });
    }
  }
};
</script>