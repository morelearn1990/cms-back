<template>
    <app-layout>
        <div slot="content" class="index">这是首页</div>
    </app-layout>
</template>
<style scoped>
.index{
    padding: 20px;
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
