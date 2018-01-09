<template>
    <el-tabs value='first' type='card' class="page-wrapper" v-loading="loading">
        <el-tab-pane label="基础设置" name="first" class="page-header">
            <setting-panel :list='group1'></setting-panel>
        </el-tab-pane>
        <el-tab-pane label="核心设置" name="second">
            <setting-panel :list='group2'></setting-panel>
        </el-tab-pane>
        <el-tab-pane label="扩展设置" name="third">
            <setting-panel :list='group3'></setting-panel>
        </el-tab-pane>
        <el-tab-pane label="新增设置" name="fourth">
            <setting-add></setting-add>
        </el-tab-pane>
    </el-tabs>
</template>
<style lang="less">
    .page-wrapper {
        width: 100%;
        height: 100%;
        .el-tabs__content {
            height: calc(~'100% - 55px');
            .el-tab-pane {
                height: 100%;
            }
        }
    }
</style>
<script>
import settingPanel from './settingPanel.vue'
import settingAdd from './settingAdd.vue'
export default {
    data() {
        return {
            group1: [],
            group2: [],
            group3: [],
            loading: true,
            err: null
        };
    },
    components:{
        settingPanel,
        settingAdd
    },
    created: function () {
        var _this = this
        _this.axios.get('/system/base').then((res) => {
            var settings = res.data;
            settings.forEach(item => {
                item.group == '1' && _this.group1.push(item);
                item.group == '2' && _this.group2.push(item);
                item.group == '3' && _this.group3.push(item);
            });
            _this.loading = false;
        }).catch((err) => {
            _this.err = err.toString()
            _this.$message({
                message: '没有请求到数据，请稍后再试',
                type: 'error'
            })
        })
    }
};
</script>