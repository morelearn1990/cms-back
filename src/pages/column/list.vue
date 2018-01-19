<template>
  <div class="column">
    <div class="column-bar">
      <el-button type="success" size='mini' @click="columnEdit('new')">新增顶级栏目</el-button>
    </div>
    <div class="column-body">
      <el-tree :data="column" :props="defaultProps" node-key="columnId" :default-expand-all='false' :expand-on-click-node="false" :render-content="renderContent"></el-tree>
    </div>
  </div>
</template>
<style lang="less">
  .column {
    padding: 10px;
    height: 100%;
    overflow: hidden;
    .column-bar{
      height: 40px;
    }
    .column-body{
      height: calc(~'100% - 40px');
      overflow-y:scroll;
    }
    .el-tree-node__content {
      height: 39px;
    }
  }
</style>
<script>
  let id = 1000;

  export default {
    data() {
      return {
        column: [],
        defaultProps: {
          children: 'children'
        }
      }
    },
    created: function () {
      var _this = this;
      _this.axios.get('/column/list').then(res => {
        _this.column = res.data.columnList;
      })
    },
    methods: {
      columnEdit(type,data) {
        var id;
        data?id = data.columnId:id = 0;
        this.$router.push(`/column/${type}/${id}`)
      },
      toArticleList(data){
        var id = data.columnId;
        this.$router.push({ path: '/article', query: { columnId: id }})
      },
      columnRemove(node, data) {
        var _this = this;
        _this.$confirm('此操作将永久删除该栏目及其子栏目, 是否继续?', '提示',{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            _this.axios.delete('/column/delete').then(res => {
              if(res.data.result){
                const parent = node.parent;
                const children = parent.data.children || parent.data;
                const index = children.findIndex(d => d.id === data.id);
                children.splice(index, 1);
                _this.$message({
                  type:'success',
                  message:'删除成功~~'
                })
              }else{
                throw '服务器删除失败~~'
              }
            }).catch(err => {
              _this.err = err.toString()
              _this.$message({
                type:'error',
                message:'删除失败~~'
              })
            })
        }).catch(() => {
          _this.$message({
                type:'warning',
                message:'取消删除~~'
              })
        })
      },
      renderContent(h, { node, data, store}) {
        return (
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
            <span>
              <span class="color-gray">{data.columnName} (ID: {data.columnId})</span>
              <span class="color-green">[文档: {data.total}]</span>
            </span>
            <span>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.toArticleList(data) }>预览</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.columnEdit('new', data) }>新增子类</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.columnEdit('edit', data) }>修改</el-button>
              <el-button style="font-size: 12px;" type="text" on-click={ () => this.columnRemove(node, data) }>删除</el-button>
            </span>
          </span>
        );
      }
    }
  };
</script>