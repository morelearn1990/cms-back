<template>
    <el-tabs value='first' type="border-card" class="list-tabs">
        <el-tab-pane label="文章模型" name="first">
            <list-panel list='article'></list-panel>
        </el-tab-pane>
        <el-tab-pane label="栏目模型" name="second">
            <list-panel list='column'></list-panel>
        </el-tab-pane>
    </el-tabs>
</template>
<style lang="less">
    .list-tabs {
        width: 100%;
        height: 100%;
        overflow: hidden;
        .el-tabs__content{
            height: calc(~'100% - 40px');
            .el-tab-pane {
                height: 100%;
            }
        }
    }
</style>
<script>
    import listPanel from './listPanel.vue'
    export default {
        components: {
            listPanel
        }
    }
</script>