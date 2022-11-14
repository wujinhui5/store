<template>
  <ul class="main-top-nav">
    <li><a href="#">服装城</a></li>
    <li><a href="#">美妆馆</a></li>
    <li><a href="#">传智超市</a></li>
    <li><a href="#">全球购</a></li>
    <li><a href="#">闪购</a></li>
    <li><a href="#">团购</a></li>
    <li><a href="#">拍卖</a></li>
    <li><a href="#">有趣</a></li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
.main-top-nav {
  float: left;
  margin-left: 23px;
}

li {
  float: left;
}

li a {
  display: block;
  height: 45px;
  padding: 0 23px;
  color: #333;
  font-size: 16px;
  line-height: 47px;
}

li a:hover {
  background-color: #b1191a;
  color: #f7f7f7;
}
</style>