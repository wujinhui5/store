<template>
  <TopNav />
  <AppHeader />
  <div class="main clearfix">
    <div class="w">
      <AsideNav />
      <div class="order-list fl">
        <router-view></router-view>
      </div>
    </div>
  </div>
  <AppFooter />
</template>

<script>
import AsideNav from "./components/AsideNav";
import TopNav from "@/components/topNav/TopNav";
import AppHeader from "@/components/header/AppHeader";
import AppFooter from "@/components/footer/AppFooter";

export default {
  components: { TopNav, AppHeader, AppFooter, AsideNav },
  setup(){
    document.title="品优购商城-我的订单"
  }
};
</script>

<style lang="less" scoped>
.main {
  min-width: 1200px;
  padding-top: 20px;
  background-color: #f5f5f5;
  .order-list {
    width: 1060px;
    padding: 10px;
    background-color: #fff;
  }
}
</style>