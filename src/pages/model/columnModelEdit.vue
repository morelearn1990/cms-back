<template>
    <div class="model-edit">
        <el-form  ref="form" :model="model"  label-width="80px" size="mini" class="model-form">
            <el-row>
                <el-col :span='8'>
                    <el-form-item label="模型名称" required>
                        <el-input v-model="model.modelName" :disabled="model.isdefault"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span='16'>
                    <el-form-item label="模型描述">
                        <el-input v-model="model.modelDes" :disabled="model.isdefault"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-table ref="multipleTable" size="mini" :data="model.modelItem" height="table-style" border stripe class="table-style">
                <el-table-column prop="name" label="变量名" min-width="20" align="center">
                    <template slot-scope="scope">
                        <el-input size="mini" v-if="!model.isdefault" v-model="scope.row.var" placeholder="请输入变量名称"></el-input>
                        <span v-else>{{scope.row.var}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="变量名称" min-width="20" align="center">
                    <template slot-scope="scope">
                        <el-input size="mini" v-if="!model.isdefault" v-model="scope.row.varName" placeholder="请输入变量名称"></el-input>
                        <span v-else>{{scope.row.varName}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="value" label="变量类型" min-width="20" align="center">
                    <template slot-scope="scope">
                        <el-select size="mini" v-if="!model.isdefault" v-model="scope.row.varType" no-data-text="请输入变量类型">
                            <el-option v-for="(item, index) in varTypes" :key="index" :label="item.value" :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                        <span v-else>{{scope.row.varType}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="des" label="变量描述" min-width="40" align="center">
                    <template slot-scope="scope">
                        <el-input size="mini" v-if="!model.isdefault" v-model="scope.row.varDes" placeholder="请输入变量描述"></el-input>
                        <span v-else>{{scope.row.varDes}}</span>
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-button type="primary" v-if="!model.isdefault" size="mini" @click='save'>保存</el-button>
                <el-button size="mini" @click='cancel'>返回</el-button>
            </el-row>
        </el-form>
    </div>
</template>
<style lang="less" scoped>
    .model-edit {
        width: 100%;
        height: 100%;
        padding: 10px;
        .model-form{
            width: 100%;
            height: 100%;
            .table-style {
                width: 99%;
                height: calc(~'100% - 90px');
                margin-bottom: 10px;
            }
        }
        
    }
</style>
<script>
    export default {
        data() {
            return {
                model: {},
                modelDefault: {
                    modelName: '',
                    modelDes: '',
                    isdefault: false,
                    modelItem: [{

                    }]
                },
                rule:{
                    
                },
                varTypes: [{
                    label: '文本',
                    value: 'text'
                }, {
                    label: '文本域',
                    value: 'textArea'
                }, {
                    label: '数字',
                    value: 'number'
                }, {
                    label: '选择器',
                    value: 'select'
                }, {
                    label: '图片',
                    value: 'imgUpload'
                }, {
                    label: '视频',
                    value: 'videoUpload'
                }, {
                    label: '富文本',
                    value: 'Richtext'
                }]
            }
        },
        created: function () {
            var _this = this;
            _this.$route.params.id != 'new' ?
                _this.axios.get(`/model/article/edit/`, {
                    id: _this.$route.params.id
                }).then((res) => {
                    res.data.model ? _this.model = res.data.model : '';
                }) :
                _this.model = _this.modelDefault;
        },
        methods: {
            save() {
                var _this = this;
                _this.axios.post('/model/article/edit/post', {
                    model: _this.model
                }).then((res) => {
                    res.data.result ? (_this.$message({
                        type: 'success',
                        message: '保存成功~'
                    }) && _this.$router.go(-1)) : _this.$message({
                        type: 'error',
                        message: '保存失败~'
                    });
                }).catch((err) => {
                    _this.$message({
                        type: 'error',
                        message: '保存失败~'
                    })
                })
            },
            cancel() {
                this.$router.go(-1);
            }
        }
    }
</script>