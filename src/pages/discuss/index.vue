<template>
    <app-layout>
        <div  slot="content" class="discuss">
            <p>额外功能后期在开发</p>
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
export default {
    components:{
        appLayout
    }
}
</script>
