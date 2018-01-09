<template>
    <div class="model-edit">
        <el-row>
            <el-col :span='12' class="input-group">
                <el-col :span='6' class="input-label">
                    <span>模型名称</span>
                </el-col>
                <el-col :span='18' class="input-control">
                    <el-input size="mini" v-model="modelName" :disabled="isdefault" placeholder="请输入模型名称"></el-input>
                </el-col>
            </el-col>
            <el-col :span='12' class="input-group">
                <el-col :span='6' class="input-label">
                    <span>模型描述</span>
                </el-col>
                <el-col :span='18' class="input-control">
                    <el-input size="mini" v-model="modelDes" :disabled="isdefault" placeholder="请输入模型描述"></el-input>
                </el-col>
            </el-col>
        </el-row>
        <el-table ref="multipleTable" size="mini" :data="modelItem" height="table-style" border stripe class="table-style">
            <el-table-column prop="name" label="变量名" min-width="20" align="center">
                <template slot-scope="scope">
                    <el-col :span='24' class="input-group" v-if="!isdefault">
                        <el-input size="mini" v-model="scope.row.varName" placeholder="请输入变量名称"></el-input>
                    </el-col>
                    <span v-else>{{scope.row.varName}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="value" label="变量类型" min-width="40" align="center">
                <template slot-scope="scope">
                    <el-col :span='24' class="input-group" v-if="!isdefault">
                        <el-select v-model="scope.row.varType" size="mini" no-data-text="请输入变量类型">
                            <el-option v-for="(item, index) in varTypes" :key="index" :label="item.value" :value="item.value">
                                <span style="float: left">{{ item.label }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                            </el-option>
                        </el-select>
                    </el-col>
                    <span v-else value="">{{scope.row.varType}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="des" label="变量描述" min-width="40" align="center">
                <template slot-scope="scope">
                    <el-col :span='24' class="input-group" v-if="!isdefault">
                        <el-input size="mini" v-model="scope.row.varDes" placeholder="请输入变量描述"></el-input>
                    </el-col>
                    <span v-else>{{scope.row.varDes}}</span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<style lang="less" scoped>
.model-edit{
    width: 100%;
    height: 100%;
    padding: 10px;
    .input-group{
        padding: 5px 10px;
        .input-label{
            padding: 0 10px;
            text-align: right;
        }
        .input-control{
            padding: 0 10px;
        }
    }
    .table-style{
        width: 99%;
        height: calc(~'100% - 40px');
    }
}
</style>
<script>
    export default {
        data() {
            return {
                modelName:'',
                modelDes:'',
                isdefault:true,
                modelItem: [{
                    varName:'你好',
                    varDes:'不好',
                    varType:'text'
                }],
                varTypes:[{
                    label:'',
                    value:''
                },{
                    label:'文本',
                    value:'text'
                },{
                    label:'文本域',
                    value:'textArea'
                },{
                    label:'数字',
                    value:'number'
                },{
                    label:'选择器',
                    value:'select'
                },{
                    label:'图片',
                    value:'imgUpload'
                },{
                    label:'视频',
                    value:'videoUpload'
                },{
                    label:'富文本',
                    value:''
                },]
            }
        },
        created: function () {
            var _this = this;
        }
    }
</script>