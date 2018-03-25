<template>
    <el-tabs value='first' type='card' class="page-wrapper" v-loading="loading">
        <el-tab-pane label="基础设置" name="first" class="page-header">
            <setting-panel :list='group1' @delete="settingDelete" @update="save"></setting-panel>
        </el-tab-pane>
        <el-tab-pane label="核心设置" name="second">
            <setting-panel :list='group2' @delete="settingDelete" @update="save"></setting-panel>
        </el-tab-pane>
        <el-tab-pane label="扩展设置" name="third">
            <setting-panel :list='group3' @delete="settingDelete" @update="save"></setting-panel>
        </el-tab-pane>
        <el-tab-pane label="新增设置" name="fourth">
            <setting-add @create="createSetting"></setting-add>
        </el-tab-pane>
    </el-tabs>
</template>
<style lang="less">
.page-wrapper {
  width: 100%;
  height: 100%;
  .el-tabs__content {
    height: calc(~"100% - 55px");
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
<script>
import settingPanel from "./settingPanel.vue";
import settingAdd from "./settingAdd.vue";
export default {
  data() {
    return {
      settings: [],
      loading: true,
      err: null
    };
  },
  components: {
    settingPanel,
    settingAdd
  },
  created: function() {
    var _this = this;
    _this.$axios_wrapper("settings.list").then(res => {
      _this.settings = res.data.settings;
      _this.loading = false;
    });
  },
  computed: {
    group1() {
      return this.settings.filter(item => item.group == 1);
    },
    group2() {
      return this.settings.filter(item => item.group == 2);
    },
    group3() {
      return this.settings.filter(item => item.group == 3);
    }
  },
  methods: {
    settingDelete(id) {
      let _this = this;
      _this.$axios_wrapper("settings.distory", { _id: id }).then(res => {
        _this.list.splice(_this.list.findIndex(item => (item._id = id)), 1);
        _this.$message({
          type: "success",
          message: "删除成功"
        });
      });
    },
    save(edit) {
      let _this = this;
      _this.$axios_wrapper("settings.update", edit).then(res => {
        _this.$message({
          type: "success",
          message: "修改成功"
        });
        _this.settings.splice(
          _this.settings.findIndex(item => (item._id = edit._id)),
          1,
          edit
        );
      });
    },
    createSetting(setting) {
      let _this = this;
      _this.$axios_wrapper("settings.create", setting).then(res => {
        _this.$message({
          message: "保存成功",
          type: "success"
        });
        _this.settings.push(setting);
        console.log(res);
      });
    }
  }
};
</script>