<template>
<div class="column-edit">

    <el-dialog title="选择栏目模型" :visible.sync="columnModelSelect">
        <el-form>
            <el-form-item label="栏目模型">
                <el-select v-model="columnModel" placeholder="请选择栏目模型">
                    <el-option v-for="item in columnModelList" :key='item.id' label="item.name" value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="save">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>
<style lang="less">

</style>
<script>
    export default {
        data: function () {
            return {
                parentColumnId: null,
                type: 'new',
                columnModel:'',
                columnModelList:[],
                columnModelSelect:false,
                column:[],
                err:''
            }
        },
        created: function () {
            var _this = this;
            _this.columnId = _this.$route.params.columnId;
            console.log(_this.$route.params.type)
            _this.$route.params.type != 'new' ? console.log('aa'): _this.axios.get('/model/list/column').then((res) => {
                    _this.columnModelList = res.data.columnModelList;
                    _this.columnModelSelect = true;
                });
        },
        methods:{
            getColumnData(){
                var _this = this;
                var columnId = _this.columnId,
                    type = _this.type,
                    columnModel=_this.columnModel;
                type !='new'?(() =>{
                    _this.axios.get('/column/edit',{
                        params: {
                            columnId
                        }
                    }).then((res) =>{
                        console.log(res)
                        _this.column = res.data.column
                    }).catch((err) =>{
                        _this.err = err.toString();
                    })
                }):(() =>{
                    _this.axios.get('/column/new',{
                        params: {
                            columnModel
                        }
                    }).then((res) =>{
                        _this.column = res.data.column
                    }).catch((err) =>{
                        _this.err = err.toString();
                    })
                })
            },
            save(){
                _this.columnModelSelect = false;
                _this.getColumnData()
            }
        }
    }
</script>