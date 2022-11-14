<template>
  <div class="store-header">
    <div class="w">
      <AppLogo />
      <HeaderSearch />
    </div>
  </div>
</template>

<script>
import AppLogo from "@/components/AppLogo";
import HeaderSearch from "./components/HeaderSearch";

export default {
  components: { AppLogo, HeaderSearch },
};
</script>

<style lang="less" scoped>
/* 头部模块*/

.store-header {
  min-width: 1200px;
  height: 95px;
  background-color: #fff;
  .w {
    position: relative;
    height: 95px;
    padding-top: 15px;
    .header-search {
      float: right;
      margin-top: 22px;
    }
    .app-logo {
      float: left;
    }
  }
}
</style>