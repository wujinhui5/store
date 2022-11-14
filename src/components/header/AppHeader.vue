<template>
  <div class="store-header">
    <div class="w">
      <AppLogo />
      <HeaderSearch />
      <HotWords />
      <ShopCarEntrance />
    </div>
  </div>
</template>

<script>
import AppLogo from "@/components/AppLogo";
import HeaderSearch from "./components/HeaderSearch";
import ShopCarEntrance from "./components/ShopCarEntrance";
import HotWords from "./components/HotWords";

export default {
  components: { AppLogo, HeaderSearch, ShopCarEntrance, HotWords },
};
</script>

<style lang="less" scoped>
/* 头部模块*/

.store-header {
  min-width: 1200px;
  height: 95px;
  background-color: #fff;
  .app-logo {
    float: left;
  }
  .header-search {
    position: absolute;
    top: 17px;
    left: 50%;
  }
  .w {
    position: relative;
    height: 95px;
    padding-top: 15px;
  }
}
</style>