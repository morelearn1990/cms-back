<template>
  <div class="">
      <menu-header></menu-header>
      <menu-nav ></menu-nav>
  </div>
</template>
<style lang="less" scoped>

</style>
<script>
import menuNav from './menu-nav.vue'
import menuHeader from './menu-header.vue'

export default {
  components:{
      menuNav,
      menuHeader
  }
}
</script>

