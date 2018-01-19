<template>

</template>
<style lang="less">

</style>
<script>
    export default {
        data: function () {
            return {
                columnId: null,
                type: 'new'
            }
        },
        created: function () {
            this.$route.params != 'new' ? this.type = 'edit' : '';
            this.columnId = this.$route.params.columnId;

        },
        methods:{
            getColumnData(){
                var columnId = this.columnId;
            }
        }
    }
</script>