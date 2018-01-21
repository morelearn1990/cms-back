<template>
    <div class="column-edit">
        <el-form label-position='right' size='small' label-width="100px" class="column-form">
            <el-form-item v-for="(item,index) in column" :key='index' :label="item.cname" v-if='item.type != "auto"'>
                <el-input v-if='item.type == "text"' :name='item.name' :value='item.value' class="input"></el-input>
                <el-input v-else-if='item.type == "textarea"' type="textarea" :name='item.name' :value='item.value' :rows='4' class="input"></el-input>
                <el-switch v-else-if='item.type == "switch"' v-model="item.value" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <el-select v-else-if='item.type == "select"' v-model="item.value" placeholder="请选择">
                    <el-option v-for="subitem in item.source" :key="subitem.value" :label="subitem.name" :value="subitem.value">{{subitem.name}}</el-option>
                </el-select>
                <el-upload v-else-if='item.type == "fileimg"' class="upload-demo" action="/article/edit/img" :multiple='false' :limit='1' :file-list="item.value" list-type="picture-card">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
                <div v-else-if='item.type == "richtext"' class="richtext">
                    <quill-editor ref="myTextEditor" :options='richtextoption' v-model="item.value"></quill-editor>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="success" @click="save">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
        <el-dialog title="选择栏目模型" :visible.sync="columnModelSelect">
            <el-form>
                <el-form-item label="栏目模型">
                    <el-select v-model="columnModel" placeholder="请选择栏目模型">
                        <el-option v-for="item in columnModelList" :key='item.id' :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="selectModel">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<style lang="less">
.column-edit {
  height: 100%;
  width: 100%;
  .column-form {
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
    .input {
      width: 50%;
      min-width: 300px;
    }
  }
  @import url("/node_modules/quill/dist/quill.core.css");
  @import url("/node_modules/quill/dist/quill.snow.css");
  @import url("/node_modules/quill/dist/quill.bubble.css");
  .richtext {
    .ql-picker-label > svg {
      position: absolute;
    }
    .ql-picker-label::before {
      position: absolute;
    }
    .ql-editor {
      height: 450px;
    }
  }
}
</style>
<script>
import { quillEditor } from "vue-quill-editor";
export default {
  data: function() {
    return {
      parentColumnId: null,
      type: "new",
      columnModel: "",
      columnModelList: [],
      columnModelSelect: false,
      column: [],
      err: "",
      richtextoption: {
        theme: "snow"
      }
    };
  },
  components: {
    quillEditor
  },
  created: function() {
    var _this = this;
    _this.columnId = _this.$route.params.columnId;
    _this.$route.params.type != "new"
      ? ((_this.type = "edit"), _this.getColumnData())
      : _this.axios.get("/model/list/column").then(res => {
          _this.columnModelList = res.data.lists;
          _this.columnModelSelect = true;
        });
  },
  methods: {
    getColumnData() {
      var _this = this;
      var columnId = _this.columnId,
        type = _this.type,
        columnModel = _this.columnModel;
      type != "new"
        ? _this.axios
            // 这儿需要增加查询参数
            .get("/column/edit")
            .then(res => {
              _this.column = res.data.column;
            })
            .catch(err => {
              _this.err = err.toString();
            })
        : _this.axios
            // 这儿需要增加查询参数
            .get("/column/new")
            .then(res => {
              _this.column = res.data.column;
            })
            .catch(err => {
              _this.err = err.toString();
            });
    },
    selectModel() {
      this.columnModelSelect = false;
      this.getColumnData();
    },
    cancel() {
      this.$router.go(-1);
    },
    save() {
      var _this = this;
      _this.axios
        .post("/article/edit/post", {
          data: _this.article
        })
        .then(res => {
          if (res.data.result) {
            _this.$message({
              type: "success",
              message: "新增/修改成功"
            });
            _this.$router.go(-1);
          } else {
            throw "新增/修改失败";
          }
        })
        .catch(err => {
          _this.err = err.toString();
          _this.$message({
            type: "error",
            message: "新增/修改失败"
          });
        });
    }
  }
};
</script>