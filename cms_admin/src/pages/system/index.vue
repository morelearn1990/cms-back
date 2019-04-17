<template>
    <app-layout>
        <router-view slot="content"></router-view>
    </app-layout>
</template>
<script>
import appLayout from "@/components/layout.vue"
export default {
    components:{
        appLayout
    }
}
</script>