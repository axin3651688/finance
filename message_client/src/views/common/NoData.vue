<template>
  <div class="NoData">
    <div class="content">
      <i class="content-icon el-icon-warning"></i>
      <slot>数据加载中...</slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NoData'
};
</script>

<style lang="scss" scoped>
  .content{
    margin: 30px 0;
    font-size: 30px;
    font-weight: bold;
    color: #cccccc;
    text-align: center;
  }
  .content-icon{
    margin-right: 15px;
  }
</style>
