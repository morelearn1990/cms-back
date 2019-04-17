<template>
  <div class="column-edit">
    <el-form label-position='right' size='small' :model="column" ref="columnForm" label-width="100px" class="column-form">
      <el-form-item label="名称">
        <el-input v-model="column.cname" class="input" placeholder="请输入栏目名称"></el-input>
      </el-form-item>
      <el-form-item label="父栏目">
        <el-input v-model="column.parentColumn" class="input" disabled></el-input>
      </el-form-item>
      <el-form-item label="文章模型">
        <el-select v-model="column.articleModel" placeholder="请选择文章模型">
          <el-option v-for="item in articleModels" :key='item._id' :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-for="(item,index) in columnFields" :key='index' :label="item.cname" v-if='item.inputType != "auto"'>
        <el-input v-if='item.inputType == "text"' v-model="column.fields[item.name]" class="input"></el-input>
        <el-input v-else-if='item.inputType == "textarea"' v-model="column.fields[item.name]" type="textarea" :rows='4' class="input"></el-input>
        <el-switch v-else-if='item.inputType == "switch"' v-model="column.fields[item.name]" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        <el-select v-else-if='item.inputType == "select"' v-model="column.fields[item.name]" placeholder="请选择">
          <el-option v-for="subitem in item.source" :key="subitem.value" :label="subitem.name" :value="subitem.value">{{subitem.name}}</el-option>
        </el-select>
        <el-upload-extr v-else-if='item.inputType == "imgfile"' :file.sync="column.fields[item.name]" :limit='1' accept='image/jpeg,image/png'>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload-extr>
        <el-upload-extr v-else-if='item.inputType == "imgfiles"' :files.sync="column.fields[item.name]" accept='image/jpeg,image/png'>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload-extr>
        <el-upload-extr v-else-if='item.inputType == "videofile"' :file.sync="column.fields[item.name]" :limit='1' accept='video/mp4,video/x-msvideo,video/quicktime'>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp4/avi文件，且不超过100mb</div>
        </el-upload-extr>
        <el-upload-extr v-else-if='item.inputType == "videofiles"' :files.sync="column.fields[item.name]" accept='video/mp4,video/x-msvideo,video/quicktime'>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传mp4/avi文件，且不超过100mb</div>
        </el-upload-extr>
        <div v-else-if='item.inputType == "richtext"' class="richtext">
          <quill-editor ref="myTextEditor" :options='richtextoption' v-model="column.fields[item.name]"></quill-editor>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="选择栏目模型" :visible.sync="modelSelect" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
      <el-form>
        <el-form-item label="栏目模型">
          <el-select v-model="modelId" placeholder="请选择栏目模型">
            <el-option v-for="item in columnModels" :key='item._id' :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="selectModel">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor";
import ElUploadExtr from "@/components/upload.vue";
export default {
  components: {
    quillEditor,
    ElUploadExtr
  },
  data: function() {
    return {
      type: "new",
      modelId: "",
      model: "",
      modelList: [],
      modelSelect: false,
      column: {
        cname: "",
        articleModel: "",
        columnModel: ""
      },
      columnDefault: {
        cname: "",
        parentColumn: "",
        articleModel: "",
        columnModel: ""
      },
      // rules: {
      //   cname: [{ required: true, message: "请输入栏目名称", trigger: "blur" }],
      //   articleModel: [
      //     { required: true, message: "请选择文章模型", trigger: "blur" }
      //   ]
      // },
      err: "",
      richtextoption: {
        theme: "snow"
      }
    };
  },
  computed: {
    columnModels() {
      return this.modelList.filter(item => item.type == "column");
    },
    articleModels() {
      return this.modelList.filter(item => item.type == "article");
    },
    columnFields() {
      return this.model.fields;
    },
    parentColumnId() {
      return this.$route.query.parentColumnId;
    },
    columnId() {
      return this.$route.params.id;
    }
  },
  mounted: function() {
    let _id = this.columnId;
    this.$axios_wrapper("models.list").then(res => {
      this.modelList = res.data.modelDocs;
    });
    _id != "new"
      ? this.$axios_wrapper("columns.edit", { _id }).then(res => {
          this.column = res.data.column;
          this.model = res.data.model;
        })
      : (this.modelSelect = true);
  },
  methods: {
    selectModel() {
      this.modelId == ""
        ? this.$message({ type: "error", message: "请选择一个模型" })
        : this.$axios_wrapper("models.show", { _id: this.modelId }).then(
            res => {
              this.model = res.data.model;
              let fields = this.model.fields,
                fieldsInput = {};
              for (let i = 0; i < fields.length; i++) {
                fieldsInput[fields[i].name] =
                  fields[i].inputType == "fileimg" ||
                  fields[i].inputType == "filevideo"
                    ? []
                    : null;
              }
              this.column.fields = fieldsInput;
              this.column.columnModel = this.modelId;
              this.parentColumnId
                ? (this.column.parentColumn = this.parentColumnId)
                : "";
              this.modelSelect = false;
            }
          );
    },
    cancel() {
      this.$router.go(-1);
    },
    save() {
      this.columnId == "new"
        ? this.$axios_wrapper("columns.create", { ...this.column })
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
        : this.$axios_wrapper("columns.update", { ...this.column })
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
      min-width: 500px;
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