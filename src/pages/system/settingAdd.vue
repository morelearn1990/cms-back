<template>
    <div class="page-content">
        <el-row class="input-group">
            <el-col :span='6' class="input-label">
                <span>变量名</span>
            </el-col>
            <el-col :span='12' class="input-control">
                <el-input v-model="name" placeholder="请输入变量名" size="small"></el-input>
            </el-col>
        </el-row>
        <el-row class="input-group">
            <el-col :span='6' class="input-label">
                <span>变量描述</span>
            </el-col>
            <el-col :span='12' class="input-control">
                <el-input v-model="description" placeholder="请输入变量描述" size="small"></el-input>
            </el-col>
        </el-row>
        <el-row class="input-group">
            <el-col :span='6' class="input-label">
                <span>变量类型</span>
            </el-col>
            <el-col :span='12' class="input-control">
                <el-radio-group v-model="inputType" size="small" @change="typeChange">
                    <el-radio label="text">文本</el-radio>
                    <el-radio label="textarea">多行文本</el-radio>
                    <el-radio label="boolean">布尔(Y/N)</el-radio>
                    <el-radio label="number">数字</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row class="input-group">
            <el-col :span='6' class="input-label">
                <span>变量值</span>
            </el-col>
            <el-col :span='12' class="input-control">
                <el-input v-if="inputType=='text'" v-model="value" placeholder="请输入变量值" size="small"></el-input>
                <el-input v-if="inputType=='textarea'" type="textarea" v-model="value" placeholder="请输入变量值" size="small"></el-input>
                <el-radio-group v-if="inputType=='bolean'" v-model="value">
                    <el-radio :label="true">Y</el-radio>
                    <el-radio :label="false">N</el-radio>
                </el-radio-group>
                <el-input-number v-if="inputType == 'number'" v-model="value"></el-input-number>
            </el-col>
        </el-row>
        <el-row class="input-group">
            <el-col :span='6' class="input-label">
                <span>变量分组</span>
            </el-col>
            <el-col :span='12' class="input-control">
                <el-select v-model="group" placeholder="请选择分组" size="small">
                    <el-option :value="1" label="基础设置">基础设置</el-option>
                    <el-option :value="2" label="核心设置">核心设置</el-option>
                    <el-option :value="3" label="扩展设置">扩展设置</el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row class="input-group text-center">
            <el-button type="primary" size="small" :loading='loading' @click="save">保存</el-button>
            <el-button type="primary" size="small" @click="reset">清空</el-button>
        </el-row>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      name: "",
      description: "",
      inputType: "text",
      value: "",
      group: "",
      loading: false
    };
  },
  methods: {
    save: function() {
      let data = {
        name: this.name,
        description: this.description,
        inputType: this.inputType,
        value: this.value,
        group: this.group
      };
      this.loading = true;
      this.$emit("create", data);
      this.loading = false;
      this.reset();
    },
    reset: function() {
      this.name = "";
      this.description = "";
      this.inputType = "text";
      this.value = "";
      this.group = "";
    },
    typeChange(value) {
      switch (value) {
        case "boolean":
          this.value = true;
          break;
        case "number":
          this.value = 0;
          break;
        default:
          this.value = "";
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.page-content {
  width: 100%;
  min-width: 800px;
  height: 100%;
  padding: 20px 10px;
  overflow-y: scroll;
  .text-center {
    text-align: center;
  }
}
</style>