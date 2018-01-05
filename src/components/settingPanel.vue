<template>
<div class="page-content">
    <el-table :data="listSelf" height="table-style" stripe border size='mini' class="table-style">
        <el-table-column prop="id" label="ID" width="50"></el-table-column>
        <el-table-column prop="des" label="描述" show-overflow-tooltip min-width="150"></el-table-column>
        <el-table-column label="数值" show-overflow-tooltip min-width="200">
            <template slot-scope="scope">
                <el-input v-if="scope.row.inputType == 'textarea'" type="textarea" autosize v-model="scope.row.value" placeholder="请输入内容"></el-input>
                <el-input v-if="scope.row.inputType == 'text'" v-model="scope.row.value"  size='mini' placeholder="请输入内容"></el-input>
                <el-input-number v-if="scope.row.inputType == 'number'" v-model="scope.row.value" size='mini'></el-input-number>
                <el-switch v-if="scope.row.inputType == 'bolean'" v-model="scope.row.value"  size='mini' active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
        </el-table-column>
        <el-table-column prop="name" label="变量名" width="200"></el-table-column>
    </el-table>
    <div class="btn-row">
        <el-button type="primary" size='mini'>保存</el-button>
    </div>
</div>
</template>
<script>
export default {
  props:['list'],
  data:function(){
      return {
          listSelf:this.list
      }
  },
  methods:{

  }
}
</script>

<style lang="less" scoped>
.page-content {
    width: 100%;
    height: 100%;
    padding: 0 10px;
    .table-style {
        width: 99%;
        height: calc(~'100% - 60px');
    }
    .el-textarea{
        font-size: 12px;
    }
    .btn-row{
        padding: 10px;
    }
}
</style>

