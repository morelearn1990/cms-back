<template>
    <div class="article-list" v-loading.fullscreen.lock="fullscreenLoading" :element-loading-text="text">
        <div class="btn-group">
            <el-button type="primary" size="small" @click="modelEdit('new')">新增文章</el-button>
        </div>
        <el-table ref="multipleTable" :data="articleList" size="mini" border stripe height="table-style" class="table-style">
            <el-table-column prop="id" label="ID" width="40" align="left"></el-table-column>
            <el-table-column prop="title" label="文章标题" min-width="20" align="left" show-overflow-tooltip></el-table-column>
            <el-table-column prop="flag" label="标签" min-width="10" align="left"></el-table-column>
            <el-table-column prop="publicDate" label="更新时间" min-width="15" align="left"></el-table-column>
            <el-table-column prop="writer" label="作者" min-width="10" align="left"></el-table-column>
            <el-table-column prop="column" label="栏目" min-width="10" align="left"></el-table-column>
            <el-table-column prop="" label="操作" width="150" align="left">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.row.id)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="articleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="less">
    .article-list {
        width: 100%;
        height: 100%;
        padding: 10px;
        .btn-group {
            height: 40px;
        }
        .table-style {
            width: 99%;
            height: calc(~"100% - 40px");
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                articleList: [],
                err: '',
                fullscreenLoading: true,
                text: '正在加载。。。'
            }
        },
        created() {
            this.update();
        },
        methods: {
            update() {
                var _this = this;
                _this.axios.get('/article/list').then((res) => {
                    _this.articleList = res.data.articleList;
                    _this.fullscreenLoading = false;
                }).catch((err) => {
                    _this.err = err.toString();
                    _this.fullscreenLoading = false;
                })
            },
            edit(id) {
                var _this = this;
                _this.$router.push({
                    path: `/article/edit/${id}`
                });
            },
            articleDelete(index, row) {
                var _this = this;
                _this.$confirm("此操作将永久删除该文章, 是否继续?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "error"
                    })
                    .then(() => {
                        _this.deleteAxios(index, row.id);
                    })
                    .catch(() => {
                        _this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            deleteAxios(index, id) {
                var _this = this;
                _this.fullscreenLoading = true;
                _this.axios.delete("/article/delete", {
                        data: {
                            id
                        }
                    }).then((res) => {
                        _this.fullscreenLoading = false;
                        if(res.data.result){
                            _this.articleList.splice(index, 1);
                            _this.$message({
                                type: "success",
                                message: "删除成功"
                            });
                        }else{
                            _this.$message({
                                type: "error",
                                message: "删除失败"
                            });
                        }
                    }).catch(err => {
                        console.log(err)
                        _this.fullscreenLoading = false;
                        _this.$message({
                            type: "error",
                            message: "删除失败"
                        });
                    });
            }
        }
    }
</script>