<template>
  <div class="login-up">
    <TopNav />
    <ShopCarHeader />
    <ShopsList />
    <AppFooter />
  </div>
</template>

<script>
import TopNav from "@/components/topNav/TopNav";
import ShopCarHeader from "@/components/header/ShopCarHeader";
import ShopsList from "./components/ShopsList"
import AppFooter from "@/components/footer/AppFooter";

export default {
  components: { TopNav, ShopCarHeader,ShopsList, AppFooter },
  setup(){
    document.title="品优购商城-购物车"
  }
};
</script>

<style lang="less" scoped>
</style>