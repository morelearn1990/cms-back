<template>
  <div class="model-edit">
    <el-form ref="modelForm" :model="model" :rules="modelRule" label-width="80px">
      <el-form-item label="英文名称">
        <el-input v-model="model.name" :disabled="model.classify == 'default'" placeholder="只能是小写英文" class="input"></el-input>
      </el-form-item>
      <el-form-item label="中文名称">
        <el-input v-model="model.cname" :disabled="model.classify == 'default'" class="input"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="model.type" :disabled="model.classify == 'default'" placeholder="请选择类型">
          <el-option label="文章" value="article"></el-option>
          <el-option label="栏目" value="column"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" :disabled="model.classify == 'default'" :autosize="{ minRows: 2, maxRows: 4}" v-model="model.description" class="input-long"></el-input>
      </el-form-item>
      <el-form-item label="字段">
        <el-tag v-for="item in model.fields" size="medium" :key="item._id" class="el-tag-extr">
          {{item.cname}}
        </el-tag>
        <el-button :disabled="model.classify == 'default'" @click="editModelField" size="mini" class="el-tag-extr">选择字段</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="saveModel" type="primary">保存</el-button>
        <el-button @click="cancelModel">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="选择字段" ref="modelDialog" class="dialog-wrapper" @open="toggleSelect" :visible.sync="selectingField" width="80%">
      <el-table ref="modelFieldsTable" :data="modelFields" @selection-change="selectingModelField">
        <el-table-column type="selection" width="60"></el-table-column>
        <el-table-column prop="name" label="命名" width="100"></el-table-column>
        <el-table-column prop="cname" label="中文名" width="100"></el-table-column>
        <el-table-column prop="inputType" label="输入方式" width="90"></el-table-column>
        <el-table-column prop="description" label="描述"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editField">新增字段</el-button>
        <div>
          <el-button type="primary" @click="selectModelField">确定</el-button>
          <el-button @click="cancelSelectModelField">取消</el-button>
        </div>
      </div>
    </el-dialog>
    <el-dialog title="新增字段" ref="fieldDialog" class="dialog-wrapper" :visible.sync="editingField" width="80%">
      <el-form ref="modelFieldForm" label-width='100px' :model="modelField">
        <el-form-item label="字段">
          <el-input v-model="modelField.name" placeholder="只能是小写英文" class="input"></el-input>
        </el-form-item>
        <el-form-item label="中文名称">
          <el-input v-model="modelField.cname" class="input"></el-input>
        </el-form-item>
        <el-form-item label="输入方式">
          <el-radio-group v-model="modelField.inputType" size="small">
            <el-radio label="text">文本</el-radio>
            <el-radio label="textarea">多行文本</el-radio>
            <el-radio label="imgfile">图片</el-radio>
            <el-radio label="videofile">视频</el-radio>
            <el-radio label="richtext">富文本</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="字段描述">
          <el-input v-model="modelField.description" class="input"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="saveField">保存</el-button>
          <el-button @click="cancelField">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<style lang="less" scoped>
.model-edit {
  width: 100%;
  height: 100%;
  padding: 30px 20px 20px;
  overflow-y: scroll;
  .input {
    width: 50%;
    min-width: 200px;
  }
  .input-long {
    width: 80%;
  }
  .el-tag-extr {
    margin-left: 10px;
  }
  .dialog-footer {
    justify-content: space-between;
    display: flex;
    flex-direction: row;
  }
  .el-dialog__body {
    height: 400px;
    overflow: scroll;
  }
}
</style>

<script>
export default {
  components: {},
  data: () => {
    return {
      model: {},
      modelDefault: {
        name: "",
        cname: "",
        type: "",
        classify: "",
        builder: "",
        description: "",
        fields: []
      },
      modelRule: {
        name: [{ required: true, message: "请输入模型名", trigger: "blur" }],
        cname: [{ required: true, message: "请输入中文名", trigger: "blur" }],
        type: [{ required: true, message: "请选择类型", trigger: "change" }],
        description: [
          { required: true, message: "请输入描述", trigger: "blur" }
        ],
        fields: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个字段",
            trigger: "change"
          }
        ]
      },
      selectingField: false,
      modelFields: [],
      selectedModelField: [],
      editingField: false,
      modelField: {},
      modelFieldDefault: {
        name: "",
        cname: "",
        inputType: "",
        description: ""
      },
      fieldRule: {}
    };
  },
  computed: {
    field() {
      return this.modelFields.filter(item => {
        return this.model.fields.indexOf(item._id) != -1;
      });
    }
  },
  mounted: function() {
    var _this = this;
    let _id = _this.$route.params.id;
    _id != "new"
      ? _this.$axios_wrapper("models.show", { _id: _id }).then(res => {
          _this.model = res.data.model;
        })
      : (_this.model = _this.modelDefault);
    _this.$axios_wrapper("modelfields.list").then(res => {
      _this.modelFields = res.data.modelFields;
    });
  },
  methods: {
    saveModel() {
      this.$axios_wrapper("models.create", { ...this.model }).then(res => {
        this.$message({
          type: "seccess",
          message: "保存成功"
        });
        this.$router.go(-1);
      });
    },
    cancelModel() {
      this.$router.go(-1);
    },
    selectingModelField(value) {
      this.selectedModelField = value;
    },
    editModelField() {
      this.selectingField = true;
    },
    toggleSelect() {
      this.$nextTick(() => {
        this.field.forEach(item => {
          this.$refs.modelFieldsTable.toggleRowSelection(item);
        });
      });
    },
    selectModelField() {
      this.model.fields = this.selectedModelField;
      this.selectingField = false;
      this.selectedModelField = [];
      this.$refs.modelFieldsTable.clearSelection();
    },
    cancelSelectModelField() {
      this.selectingField = false;
      this.selectedModelField = [];
      this.$refs.modelFieldsTable.clearSelection();
    },
    editField() {
      this.editingField = true;
    },
    cancelField() {
      this.modelField = this.modelFieldDefault;
      this.editingField = false;
    },
    saveField() {
      this.$axios_wrapper("modelfields.create", { ...this.modelField })
        .then(res => {
          this.modelFields.push(res.data.modelField);
          this.cancelField();
        })
        .catch(err => {
          err.result === false
            ? this.$message({
                type: "error",
                message: err.message
              })
            : "";
        });
    }
  }
};
</script>