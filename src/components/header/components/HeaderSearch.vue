<template>
  <div class="header-search">
    <input class="fl" type="search" placeholder="搜索功能还没写" />
    <button class="fl">搜索</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.header-search {
  width: 538px;
  margin-left: -269px;
  input {
    width: 458px;
    height: 36px;
    padding-left: 10px;
    border: 2px solid #b1191a;
    outline: none;
  }
  button {
    width: 80px;
    height: 36px;
    border: 0;
    background-color: #b1191a;
    font-size: 16px;
    color: #fff;
    text-align: center;
    line-height: 36px;
  }
}
</style>