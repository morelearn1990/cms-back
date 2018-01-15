<template>
    <div class="article-list" v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="text">
        <div class="btn-group">
            <el-button-group>
                <el-button type="primary" :plain="type != 'normal'" size="small" @click="update('normal')">发布中文章</el-button>
                <el-button type="primary" :plain="type != 'draft'" size="small" @click="update('draft')">草稿文章</el-button>
                <el-button type="primary" :plain="type != 'trash'" size="small" @click="update('trash')">回收站</el-button>
            </el-button-group>
            <el-button-group>
                <el-button type="success" size="small" @click="edit('new')">新增文章</el-button>
                <el-button type="warning" size="small" @click="MultiEdit()">批量修改</el-button>
                <el-button type="danger" size="small" @click="MultiDelete()">批量删除</el-button>
            </el-button-group>
            <el-button-group>
                <el-input placeholder="请输入搜索内容" size="small" v-model="searchContent" class="input-with-select" @keyup.enter="search">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                </el-input>
            </el-button-group>
        </div>
        <el-table ref="multipleTable" :data="articleList" size="mini" border stripe height="table-style" class="table-style" @selection-change="getRow">
            <el-table-column type="selection" width="40" align="left"></el-table-column>
            <el-table-column prop="id" label="ID" width="50" align="left"></el-table-column>
            <el-table-column prop="title" label="文章标题" min-width="20" align="left" show-overflow-tooltip></el-table-column>
            <el-table-column prop="flag" label="标签" min-width="10" align="left"></el-table-column>
            <el-table-column prop="publicDate" label="发布时间" min-width="15" align="left"></el-table-column>
            <el-table-column prop="writer" label="作者" min-width="10" align="left"></el-table-column>
            <el-table-column prop="column" label="栏目" min-width="10" align="left"></el-table-column>
            <el-table-column prop="" label="操作" width="150" align="left">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="articleDelete(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="less">
.article-list {
  width: 100%;
  height: 100%;
  padding: 10px;
  .btn-group {
    height: 40px;
  }
  .table-style {
    width: 99%;
    height: calc(~"100% - 40px");
  }
  .el-input {
    margin-top: 1px;
    width: 200px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      type: "normal",
      searchContent: "",
      articleList: [],
      err: "",
      fullscreenLoading: true,
      text: "正在加载。。。",
      ids: []
    };
  },
  created() {
    this.update("normal");
  },
  methods: {
    update(type) {
      var _this = this;
      _this.type = type;
      _this.axios
        .get("/article/list")
        .then(res => {
          _this.articleList = res.data.articleList;
          _this.fullscreenLoading = false;
        })
        .catch(err => {
          _this.err = err.toString();
          _this.fullscreenLoading = false;
        });
    },
    edit(id) {
      var _this = this;
      _this.$router.push({
        path: `/article/edit/${id}`
      });
    },
    articleDelete(row) {
      var _this = this;
      _this
        .$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
        .then(() => {
          _this.deleteAxios([row.id]);
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deleteAxios(ids) {
      var _this = this;
      _this.fullscreenLoading = true;
      _this.axios
        .delete("/article/delete", {
          data: {
            ids
          }
        })
        .then(res => {
          _this.fullscreenLoading = false;
          if (res.data.result) {
            let arr = _this.articleList.filter(item => {
              return ids.indexOf(item.id) == -1;
            });
            _this.articleList = arr;
            _this.$message({
              type: "success",
              message: "删除成功"
            });
          } else {
            _this.$message({
              type: "error",
              message: "删除失败"
            });
          }
        })
        .catch(err => {
          console.log(err);
          _this.fullscreenLoading = false;
          _this.$message({
            type: "error",
            message: "删除失败"
          });
        });
    },
    search() {
      console.log("nih");
    },
    MultiDelete(ids) {
      var _this = this;
      _this
        .$confirm(`此操作将删除这些文章回收站, 是否继续?`, "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "error"
        })
        .then(() => {
          _this.deleteAxios(_this.ids);
        })
        .catch(() => {
          _this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    getRow(selection) {
      let ids = [];
      selection.forEach(row => {
        ids.push(row.id);
      });
      this.ids = ids;
    }
  }
};
</script>