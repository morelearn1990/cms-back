<template>
  <div class="system-menu">
    <div class="panel">
      <router-link to="/system/base" class="panel-item shadow-1 hover-shadow-3">基础设置</router-link>
      <router-link to="/system/user" class="panel-item shadow-1 hover-shadow-3">用户管理</router-link>
      <router-link to="/system/usermodel" class="panel-item shadow-1 hover-shadow-3">用户模型</router-link>
      <router-link to="/system/db" class="panel-item shadow-1 hover-shadow-3">数据管理</router-link>
      <router-link  to="/system/log" class="panel-item shadow-1 hover-shadow-3">日志管理</router-link>
    </div>
  </div>
</template>
<style lang="less" scoped>
.system-menu{
  margin-top: 50px;
  .panel{
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start ;
  }
  .panel-item{
    margin: 20px 5%;
    width: 23%;
    padding: 20px;
    text-align: center;
    border-radius: 10px;
    font-size: 20px;
    color: #444;
  }
}
</style>
<script>
export default {
  
}
</script>
