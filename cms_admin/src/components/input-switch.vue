<template>
  <div class="input-wrapper">

  </div>
</template>
<script>
export default {
  props:['index','type','name','value'],
  data:function(){
      return {
          childValue:this.value
      }
  }
}
</script>
<style lang="less" scoped>
.input-wrapper{
    width: 100%;
}
</style>

