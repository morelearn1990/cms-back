<template>
    <app-layout>
        <div slot="content" class="discuss">
            <d-form :text='formtext' :form='form'></d-form>
        </div>
    </app-layout>
</template>
<style lang="less">
.discuss{
    padding: 20px;
}
</style>
<script>
import appLayout from "@/components/layout.vue"
import dForm from '@/components/dform.vue'
export default {
    components:{
        appLayout,
        dForm
    },
    data(){
      return {
        formtext: `
          <el-form v-model="form" label-width="80px">
            <el-form-item label="姓名：">
              <el-input v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item label="年龄：">
              <el-input v-model.trim="form.age"></el-input>
            </el-form-item>
          </el-form>
        `,
        form: {
          name: '',
          age: ''
        },
      }
    },
    mounted() {
        this.$nextTick(function () {
            this.$forceUpdate();
        })
    }
}
</script>
