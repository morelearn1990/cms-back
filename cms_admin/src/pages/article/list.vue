<template>
  <div class="article-list" v-loading="fullscreenLoading" :element-loading-text="text">
    <div class="btn-group-wrapper">
      <el-button-group class="btn-group">
        <el-select v-model="column" placeholder="请选择" size='small' class="column-select" popper-class='column-select-content' @change='changeColumn'>
          <el-option label="全部" value=""></el-option>
          <el-option v-for="item in columns" :key="item._id" :label="item.cname" :value="item._id"></el-option>
        </el-select>
      </el-button-group>
      <el-button-group class="btn-group">
        <el-button type="primary" :plain="tag != 'normal'" size="small" @click="changeTag('normal')">
          <span class="hidden-lg-and-up">
            <i class="iconfont icon-normal font12"></i>
          </span>
          <span class="hidden-md-and-down">正常文章</span>
        </el-button>
        <el-button type="primary" :plain="tag != 'draft'" size="small" @click="changeTag('draft')">
          <span class="hidden-lg-and-up">
            <i class="iconfont icon-draft font12"></i>
          </span>
          <span class="hidden-md-and-down">草稿文章</span>
        </el-button>
        <el-button type="primary" :plain="tag != 'trash'" size="small" @click="changeTag('trash')">
          <span class="hidden-lg-and-up">
            <i class="iconfont icon-recyclebin font12"></i>
          </span>
          <span class="hidden-md-and-down">回收站</span>
        </el-button>
      </el-button-group>
      <el-button-group class="btn-group">
        <el-button type="success" size="small" @click="edit('new')">
          <span class="hidden-lg-and-up">
            <i class="iconfont icon-new font12"></i>
          </span>
          <span class="hidden-md-and-down">新建文章</span>
        </el-button>
        <el-button type="warning" size="small" @click="MultiEditDialog()">
          <span class="hidden-lg-and-up">
            <i class="iconfont icon-edit font12"></i>
          </span>
          <span class="hidden-md-and-down">批量编辑</span>
        </el-button>
      </el-button-group>
      <el-button-group class="btn-group" style="padding-top: 1px;">
        <el-input placeholder="请输入搜索内容" size="small" v-model="searchContent" class="hidden-xs-only search-input" @keyup.enter="search">
          <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
        </el-input>
      </el-button-group>
    </div>
    <el-dialog title="批量修改" :visible.sync="MultiEditControl" width="370px" center>
      <div>
        <el-form ref="form" label-width="80px">
          <el-form-item label="文章标签">
            <el-select v-model="MultiEditValue.flag">
              <el-option v-for="item in MultiEditField.flag" :key="item.tag" :label="item.name" :value="item.tag"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="栏目">
            <el-select v-model="MultiEditValue.column">
              <el-option v-for="item in MultiEditField.column" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="MultiEditCancel">取 消</el-button>
        <el-button type="primary" @click="MultiEdit">确 定</el-button>
      </span>
    </el-dialog>
    <el-table ref="multipleTable" :data="articleList" size="mini" border stripe height="table-style" class="table-style" @selection-change="getRow">
      <el-table-column type="selection" width="40" align="left"></el-table-column>
      <el-table-column prop="title" label="文章标题" min-width="20" align="left" show-overflow-tooltip></el-table-column>
      <el-table-column prop="flag" label="标签" min-width="10" align="left"></el-table-column>
      <el-table-column prop="publicDate" label="发布时间" min-width="15" align="left">
        <template slot-scope="scope">
          <span>{{scope.row.publicDate?scope.row.publicDate:'未发布'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="writer" label="作者" min-width="10" align="left"></el-table-column>
      <el-table-column prop="column.cname" label="栏目" min-width="10" align="left"></el-table-column>
      <el-table-column prop="" label="操作" width="240" align="left">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row._id)">编辑</el-button>
          <el-button size="mini" type="success" :disabled="scope.row.tag == 'normal'" @click="articlePublic(scope.row._id)"> 发布</el-button>
          <el-button size="mini" type="danger" :disabled="scope.row.tag == 'trash'" @click="articleDelete(scope.row._id)">删除</el-button>
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
  .btn-group-wrapper {
    padding-bottom: 10px;
  }
  .btn-group {
    margin-right: 10px;
  }
  .table-style {
    width: 99%;
    height: calc(~"100% - 40px");
  }
  .column-select {
    width: 100px;
  }
  .search-input {
    width: 150px;
  }
}
</style>
<script>
export default {
  data() {
    return {
      tag: "normal",
      column: "",
      columns: [],
      searchContent: "",
      articleList: [],
      err: "",
      fullscreenLoading: true,
      text: "正在执行。。。",
      ids: [],
      MultiEditControl: false,
      MultiEditValue: {
        flag: "",
        column: ""
      },
      MultiEditValueDefault: {
        flag: "",
        column: ""
      },
      MultiEditField: {
        flag: [
          {
            tag: "f",
            name: "幻灯"
          },
          {
            tag: "r",
            name: "推荐"
          },
          {
            tag: "s",
            name: "滚动"
          },
          {
            tag: "n",
            name: "普通"
          }
        ],
        column: [
          {
            id: 1,
            name: "服务"
          },
          {
            id: 2,
            name: "关于"
          }
        ]
      }
    };
  },
  created() {
    this.column = this.$route.query.column ? this.$route.query.column : "";
    this.$axios_wrapper("columns.list").then(res => {
      this.columns = res.data.columns;
    });
    this.update();
  },
  watch: {
    column() {
      this.update();
    },
    tag() {
      this.update();
    }
  },
  methods: {
    changeColumn(column) {
      this.column = column;
    },
    changeTag(tag) {
      this.tag = tag;
    },
    update() {
      this.$axios_wrapper("articles.list", null, {
        params: { tag: this.tag, column: this.column }
      }).then(res => {
        this.articleList = res.data.articles;
        this.fullscreenLoading = false;
      });
    },
    edit(id) {
      this.$router.push({
        path: `/article/edit/${id}`
      });
    },
    articlePublic(_id) {
      this.$confirm("此操作将发布该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.$axios_wrapper("articles.public", { _id }).then(res => {
            this.update();
            this.$message({
              type: "success",
              message: "已成功发布"
            });
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消发布"
          });
        });
    },
    articleDelete(_id) {
      this.$confirm("此操作将删除该文章, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error"
      })
        .then(() => {
          this.$axios_wrapper("articles.distory", { _id }).then(res => {
            this.update();
            this.$message({
              type: "success",
              message: "已成功删除"
            });
          });
        })
        .catch(err => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    search() {
      console.log("nih");
    },
    getRow(selection) {
      let ids = [];
      selection.forEach(row => {
        ids.push(row.id);
      });
      this.ids = ids;
    },
    MultiEditDialog() {
      if (this.ids.length > 0) {
        this.MultiEditValue = this.MultiEditValueDefault;
        this.MultiEditControl = true;
      } else {
        this.$message({
          type: "wraning",
          message: "请选择文章"
        });
      }
    },
    MultiEditCancel() {
      this.MultiEditValue = this.MultiEditValueDefault;
      this.MultiEditControl = false;
    },
    MultiEdit() {
      var _this = this;
      _this.fullscreenLoading = true;
      _this.axios
        .post("/article/multiedit", {
          data: {
            ids: _this.ids,
            MultiEditValue: _this.MultiEditValue
          }
        })
        .then(res => {
          _this.fullscreenLoading = false;
          if (res.data.result) {
            _this.articleList.forEach(item => {
              if (_this.ids.indexOf(item.id) != -1) {
                item.column = _this.MultiEditValue.column;
                item.flag = _this.MultiEditValue.flag;
              }
            });
            _this.MultiEditControl = false;
            _this.MultiEditValue = this.MultiEditValueDefault;
            _this.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            _this.$message({
              type: "error",
              message: "修改失败"
            });
          }
        })
        .catch(err => {
          console.log(err);
          _this.fullscreenLoading = false;
          _this.$message({
            type: "error",
            message: "修改失败"
          });
        });
    }
  }
};
</script>