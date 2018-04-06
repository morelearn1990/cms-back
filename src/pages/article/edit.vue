<template>
  <div class="article-edit">
    <el-form label-position='right' size='small' label-width="100px" class="article-form">
      <el-form-item label="标题">
        <el-input v-model='article.title' class="input"></el-input>
      </el-form-item>
      <el-form-item label="标识">
        <el-select v-model="article.flag" placeholder="请选择">
          <el-option v-for="(item,index) in flags" :key="index" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-for="(item,index) in articleFields" :key='index' :label="item.cname" v-if='item.inputType != "auto"'>
        <el-input v-if='item.inputType == "text"' v-model='article.fields[item.name]' :name='item.name' class="input"></el-input>
        <el-input v-else-if='item.inputType == "textarea"' v-model='article.fields[item.name]' type="textarea" :name='item.name' :rows='4' class="input"></el-input>
        <el-upload v-else-if='item.inputType == "fileimg"' :file-list="article.fields[item.name]" class="upload-demo" action="/article/edit/img" :multiple='false' :limit='1' list-type="picture-card">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <div v-else-if='item.inputType == "richtext"' class="richtext">
          <quill-editor ref="myTextEditor" v-model="article.fields[item.name]" :options='richtextoption'></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="选择栏目模型" :visible.sync="columnSelect" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form>
        <el-form-item label="栏目模型">
          <el-select v-model="article.column" placeholder="请选择栏目模型">
            <el-option v-for="item in columns" :key='item._id' :label="item.cname" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectColumn">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<style lang="less">
.article-edit {
  height: 100%;
  width: 100%;
  .article-form {
    height: 100%;
    padding: 20px;
    overflow-y: scroll;
    .input {
      width: 50%;
      min-width: 300px;
    }
  }
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
      columnSelect: false,
      columns: [],
      flags: [
        { name: "推荐", value: "RECOMMEND" },
        { name: "幻灯", value: "SLIDER" },
        { name: "滚动", value: "ROLL" },
        { name: "普通", value: "NORMAL" }
      ],
      article: {
        title: "",
        tag: "draft",
        flag: "NORMAL",
        column: ""
      },
      articleFields: [],
      err: "",
      richtextoption: {
        theme: "snow"
      }
    };
  },
  computed: {
    _id() {
      return this.$route.params.id;
    },
    column() {
      return this.article.column;
    }
  },
  components: {
    quillEditor
  },
  mounted: function() {
    this.$axios_wrapper("columns.list").then(res => {
      this.columns = res.data.columns;
    });
    this._id != "new"
      ? this.$axios_wrapper("articles.show", { _id: this._id }).then(res => {
          this.article = res.data.article;
          this.getFields();
        })
      : (this.columnSelect = true);
  },
  methods: {
    async getFields() {
      this.$axios_wrapper("articles.new", null, {
        params: { column: this.column }
      }).then(res => {
        this.articleFields = res.data.articleFields;
      });
    },
    async selectColumn() {
      await this.getFields();
      let fields = this.articleFields,
        fieldsInput = {};
      for (let i = 0; i < fields.length; i++) {
        fieldsInput[fields[i].name] =
          fields[i].inputType == "fileimg" || fields[i].inputType == "filevideo"
            ? []
            : null;
      }
      this.article.fields = fieldsInput;
      this.columnSelect = false;
    },
    cancel() {
      this.$router.go(-1);
    },
    save() {
      this._id == "new"
        ? this.$axios_wrapper("articles.create", { ...this.article })
            .then(res => {
              this.$message({
                type: "success",
                message: "创建成功"
              });
              this.$router.go(-1);
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "创建失败"
              });
            })
        : this.$axios_wrapper("articles.update", { ...this.article })
            .then(res => {
              this.$message({
                type: "success",
                message: "更新成功"
              });
              this.$router.go(-1);
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: "更新失败"
              });
            });
    }
  }
};
</script>