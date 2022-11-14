<template>
  <ul class="fr">
    <li><router-link to="/order">我的订单</router-link></li>
    <li></li>
    <li class="icon-cheveron-down"><a href="#">只有“我的订单”有效</a></li>
    <li></li>
    <li><a href="#">后面的还是空链接</a></li>
    <li></li>
    <li><a href="#">企业采购</a></li>
    <li></li>
    <li class="icon-cheveron-down"><a href="#">关注品优购</a></li>
    <li></li>
    <li class="icon-cheveron-down"><a href="#">客户服务</a></li>
    <li></li>
    <li class="icon-cheveron-down"><a href="#">网站导航</a></li>
  </ul>
</template>

<script>
export default {};
</script>

<style scoped>
ul li {
  float: left;
}

li:nth-child(2n + 1) {
  padding: 0 10px;
}

li:nth-child(2n) {
  width: 1px;
  height: 12px;
  margin-top: 9px;
  background-color: #666;
}

.icon-cheveron-down::after {
  content: "\e91e";
  font-family: "icomoon";
}
</style>