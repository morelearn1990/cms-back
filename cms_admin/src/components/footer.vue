<template>
  <div class="footer">
    <p>by {{powerby}}</p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      powerby: "morelearn"
    };
  }
};
</script>
<style lang="less" scoped>
.footer {
  width: 100%;
  text-align: center;
}
</style>


