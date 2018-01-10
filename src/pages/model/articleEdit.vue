<template>
    <div class="model-edit">
        <el-row>
            <el-col :span='12' class="input-group">
                <el-col :span='6' class="input-label">
                    <span>模型名称</span>
                </el-col>
                <el-col :span='18' class="input-control">
                    <el-input size="mini" v-model="model.modelName" :disabled="model.isdefault" placeholder="请输入模型名称"></el-input>
                </el-col>
            </el-col>
            <el-col :span='12' class="input-group">
                <el-col :span='6' class="input-label">
                    <span>模型描述</span>
                </el-col>
                <el-col :span='18' class="input-control">
                    <el-input size="mini" v-model="model.modelDes" :disabled="model.isdefault" placeholder="请输入模型描述"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" size="mini" :data="model.modelItem" height="table-style" border stripe class="table-style">
            <el-table-column prop="name" label="变量名" min-width="20" align="center">
                <template slot-scope="scope">
                    <el-col :span='24' class="input-group" v-if="!model.isdefault">
                        <el-input size="mini" v-model="scope.row.varName" placeholder="请输入变量名称"></el-input>
                    </el-col>
                    <span v-else>{{scope.row.varName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="value" label="变量类型" min-width="20" align="center">
                <template slot-scope="scope">
                    <el-col :span='24' class="input-group" v-if="!model.isdefault">
                        <el-select v-model="scope.row.varType" size="mini" no-data-text="请输入变量类型">
                            <el-option v-for="(item, index) in varTypes" :key="index" :label="item.value" :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                    </el-col>
                    <span v-else>{{scope.row.varType}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="des" label="变量描述" min-width="40" align="center">
                <template slot-scope="scope">
                    <el-col :span='24' class="input-group" v-if="!model.isdefault">
                        <el-input size="mini" v-model="scope.row.varDes" placeholder="请输入变量描述"></el-input>
                    </el-col>
                    <span v-else>{{scope.row.varDes}}</span>
                </template>
            </el-table-column>
        </el-table>
        <el-row>
            <el-col :span='12' class="input-group">
                <el-button type="primary" size="mini" @click='save'>保存</el-button>
                <el-button  size="mini" @click='cancel'>返回</el-button>
            </el-col>
        </el-row>
    </div>
</template>
<style lang="less" scoped>
    .model-edit {
        width: 100%;
        height: 100%;
        padding: 10px;
        .input-group {
            padding: 5px 10px;
            .input-label {
                padding: 0 10px;
                text-align: right;
            }
            .input-control {
                padding: 0 10px;
            }
        }
        .table-style {
            width: 99%;
            height: calc(~'100% - 90px');
        }
    }
</style>
<script>
    export default {
        data() {
            return {
                model: {
                },
                modelDefault: {
                    modelName: '',
                    modelDes: '',
                    isdefault: false,
                    modelItem: [{

                    }]
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
                _this.axios.get(`/model/article/edit/`,{
                    id:_this.$route.params.id
                }).then((res) => {
                    res.data.model ? _this.model = res.data.model : '';
                }) :
                _this.model = _this.modelDefault;
        },
        methods:{
            save(){
                var _this = this;
                _this.axios.post('/model/article/edit/post',{
                    model:_this.model
                }).then((res)=>{
                    console.log(res)
                    res.data.result ? (_this.$message({
                        type:'success',
                        message:'保存成功~'
                    }) && _this.$router.go(-1)):_this.$message({
                        type:'error',
                        message:'保存失败~'
                    });
                }).catch( (err) => {
                    _this.$message({
                        type:'error',
                        message:'保存失败~'
                    })
                })
            },
            cancel(){
                this.$router.go(-1);
            }
        }
    }
</script>