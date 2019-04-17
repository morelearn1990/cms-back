<template>
    <el-tabs :value='panelSelect' type="border-card" class="list-tabs" v-loading="loading">
        <el-tab-pane label="文章模型" name="first">
            <list-panel :list="articles" @delete="modelDelete"></list-panel>
        </el-tab-pane>
        <el-tab-pane label="栏目模型" name="second">
            <list-panel :list="columns" @delete="modelDelete"></list-panel>
        </el-tab-pane>
    </el-tabs>
</template>
<style lang="less">
.list-tabs {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .el-tabs__content {
    height: calc(~"100% - 40px");
    .el-tab-pane {
      height: 100%;
    }
  }
}
</style>
<script>
import listPanel from "./listPanel.vue";
export default {
  components: {
    listPanel
  },
  data: function() {
    return {
      panelSelect: "first",
      models: [],
      loading: true
    };
  },
  created() {
    let _this = this;
    _this.$axios_wrapper("models.list").then(res => {
      _this.models = res.data.modelDocs;
      _this.loading = false;
    });
  },
  computed: {
    articles() {
      return this.models.filter(item => item.type == "article");
    },
    columns() {
      return this.models.filter(item => item.type == "column");
    }
  },
  methods: {
    modelDelete(_id) {
      let _this = this;
      _this.$axios_wrapper("models.distory", { _id }).then(res => {
        _this.models.splice(
          _this.models.findIndex(item => (item._id = _id)),
          1
        );
        _this.$message({
          type: "success",
          message: "删除成功"
        });
      });
    }
  }
};
</script>