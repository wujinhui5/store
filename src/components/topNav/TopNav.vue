<template>
  <!-- 顶部快捷导航栏 -->
  <div class="top-nav" id="toTop">
    <div class="w">
      <LoginEntrance />
      <TopNavList />
    </div>
  </div>
</template>

<script>
import LoginEntrance from "./components/LoginEntrance";
import TopNavList from "./components/TopNavList";

export default {
  components: { LoginEntrance, TopNavList },
};
</script>

<style>
/* 顶部快捷导航模块 */
.top-nav {
  min-width:1200px;
  height: 31px;
  background-color: #f1f1f1;
  color: #666;
  font-size: 12px;
  line-height: 31px;
}

.top-nav a {
  color: #666;
}

.top-nav a:hover {
  color: #c81623;
}
</style>