<template>
  <el-tabs value='first' type='card' @tab-click="handleClick" class="page-wrapper">
    <el-tab-pane label="基础设置" name="first" class="page-header">
        <div class="page-content"></div>
    </el-tab-pane>
    <el-tab-pane label="扩展设置" name="second">
        <div class="page-content"></div>
    </el-tab-pane>
  </el-tabs>
</template>
<style lang="less">
    .page-wrapper{
        height: 100%;
        .el-tabs__content{
            height: calc(~'100% - 55px');
            .el-tab-pane{
                height: 100%;
            }
            .page-content{
                width: 100%;
                height: 100%;
            }
        }
    }
</style>
<script>
  export default {
    data() {
      return {
      };
    },
    methods: {
      handleClick(tab, event) {
      }
    }
  };
</script>
