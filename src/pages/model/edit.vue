<template>
    <div class="model-edit">
        <el-table ref="multipleTable" :data="modelItem" border stripe style="width: 100%;">
            <el-table-column prop="name" label="变量" width="120" align="center"></el-table-column>
            <el-table-column prop="value" label="值" align="center"></el-table-column>
            <el-table-column prop="des" label="描述" width="240" align="center"></el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            modelItem: {},
            modelItemDefault = {
                name: {
                    type: 'input',
                    value: '',
                    des: ''
                },
                type: {
                    value: 'custom',
                    des: ''
                },
                builder: {
                    type: 'input',
                    value: '',
                    des: ''
                },
                description: {
                    type: 'text-eara',
                    value: '',
                    des: ''
                }
            }
        }
    },
    created:function(){

    },
    beforeRouteEnter(to, from, next) {
        if (to.query.id == 'new') {
            next((self) => {
                self.modelItem = modelItem;
            });
        } else {
            next((self) => {
                self.axios.get('/model/edit', {
                    params: {
                        id: to.query.id
                    }
                }).then((res) => {
                    self.modelItem = res.data.modelItem
                }).catch((err) => {
                    console.log(err)
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>

</style>
