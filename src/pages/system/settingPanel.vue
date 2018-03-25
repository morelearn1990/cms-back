<template>
    <div class="page-content">
        <el-table :data="list" height="table-style" stripe border size='mini' class="table-style">
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column prop="description" label="描述" show-overflow-tooltip min-width="150"></el-table-column>
            <el-table-column prop="value" label="数值" show-overflow-tooltip min-width="200">
                <template slot-scope="scope">
                    <p v-if="scope.row.inputType == 'boolean'">{{scope.row.value == true ? "Y" : "N" }}</p>
                    <p v-else>{{scope.row.value}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="name" label="变量名" width="200"></el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <el-button size="mini" @click="settingEdit(scope.$index,scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="settingDelete(scope.$index,scope.row)" disabled>删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog title="编辑设置" :visible.sync="isEdit">
            <el-form ref="form" :model="edit" label-width="80px">
                <el-form-item label="变量描述">
                    <p>{{edit.description}}</p>
                </el-form-item>
                <el-form-item label="变量名称">
                    <p>{{edit.name}}</p>
                </el-form-item>
                <el-form-item label="变量值">
                    <el-input v-model="edit.value" type="text" v-if="edit.inputType == 'text'"></el-input>
                    <el-input v-model="edit.value" type="textarea" v-if="edit.inputType == 'texteara'"></el-input>
                    <el-input-number v-model="edit.value" v-if="edit.inputType == 'number'"></el-input-number>
                    <el-radio-group v-model="edit.value" v-if="edit.inputType == 'boolean'">
                        <el-radio :label="true">Y</el-radio>
                        <el-radio :label="false">N</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="变量分组">
                    <el-radio-group v-model="edit.group">
                        <el-radio :label="1">基础设置</el-radio>
                        <el-radio :label="2">核心设置</el-radio>
                        <el-radio :label="3">扩展设置</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button @click="save">保存</el-button>
                    <el-button @click="cansel">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
export default {
  props: ["list"],
  data: function() {
    return {
      edit: {},
      isEdit: false
    };
  },
  methods: {
    save() {
      this.$emit("update", this.edit);
      this.isEdit = false;
      this.eidt = {};
    },
    cansel() {
      this.isEdit = false;
      this.eidt = {};
    },
    settingEdit(index, row) {
      this.edit = JSON.parse(JSON.stringify(row));
      this.isEdit = true;
    },
    settingDelete(index, row) {
      this.$emit("delete", row._id);
    }
  }
};
</script>

<style lang="less" scoped>
.page-content {
  width: 100%;
  height: 100%;
  padding: 0 10px;
  .table-style {
    width: 99%;
    height: calc(~"100% - 20px");
  }
  .el-textarea {
    font-size: 12px;
  }
}
</style>

