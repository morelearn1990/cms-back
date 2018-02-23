<template>
    <app-layout>
        <div class="model-content" slot="content">
            <router-view></router-view>
        </div>
    </app-layout>
</template>
<style lang="less" scoped>
.model-content {
    height: 100%;
}
</style>
<script>
import appLayout from "@/components/layout.vue"
export default {
    components:{
        appLayout
    }
}
</script>