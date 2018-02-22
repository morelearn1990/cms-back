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
                <el-input v-model="des" placeholder="请输入变量描述" size="small"></el-input>
            </el-col>
        </el-row>
        <el-row class="input-group">
            <el-col :span='6' class="input-label">
                <span>变量类型</span>
            </el-col>
            <el-col :span='12' class="input-control">
                <el-radio-group v-model="inputType" size="small">
                    <el-radio label="text">文本</el-radio>
                    <el-radio label="textarea">多行文本</el-radio>
                    <el-radio label="bolean">布尔(Y/N)</el-radio>
                    <el-radio label="number">数字</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row class="input-group">
            <el-col :span='6' class="input-label">
                <span>变量值</span>
            </el-col>
            <el-col :span='12' class="input-control">
                <el-input v-model="value" placeholder="请输入变量值" size="small"></el-input>
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
      des: "",
      inputType: "",
      value: "",
      group: "",
      loading: false
    };
  },
  methods: {
    save: function() {
      var _this = this;
      _this.loading = true;
      _this.axios
        .post("/system/base/add")
        .then(res => {
          _this.loading = false;
          _this.$message({
            message: "保存成功",
            type: "success"
          });
        })
        .catch(err => {
          _this.loading = false;
          _this.$message({
            message: "保存失败，请联系管理员",
            type: "error"
          });
        });
    },
    reset: function() {
      this.name = "";
      this.des = "";
      this.inputType = "";
      this.value = "";
      this.group = "";
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

  .text-center {
    text-align: center;
  }
}
</style>