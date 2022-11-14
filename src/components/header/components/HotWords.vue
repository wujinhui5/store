<template>
  <div class="hot-words">
    <ul>
      <li><a href="#">搜索关键词</a></li>
      <li><a href="#">还用不了</a></li>
      <li><a href="#">9.9元团购</a></li>
      <li><a href="#">美满99减30</a></li>
      <li><a href="#">办公用品</a></li>
      <li><a href="#">电脑</a></li>
      <li><a href="#">通信</a></li>
    </ul>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.hot-words {
  position: absolute;
  top: 59px;
  left: 50%;
  width: 538px;
  height: 19px;
  margin-left: -269px;
  padding-left: 10px;
}

li {
  float: left;
}

a {
  display: block;
  margin: 3px 22px 0 0;
  color: #666;
  font-size: 12px;
}

a:hover {
  color: #c81623;
}
</style>