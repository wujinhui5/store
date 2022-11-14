<template>
  <div class="store-home">
    <TopNav />
    <AppHeader />
    <HomeMain />
    <AppFooter />
    <PositionNav />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import TopNav from "@/components/topNav/TopNav";
import AppHeader from "@/components/header/AppHeader";
import AppFooter from "@/components/footer/AppFooter";
import PositionNav from "./components/PositionNav";
const HomeMain = defineAsyncComponent(() => import("./components/HomeMain"));

export default {
  components: { TopNav, AppHeader, HomeMain, AppFooter, PositionNav },
  setup() {
    document.title =
      "品优购商城-综合网购首选-正品低价、品质保障、配送及时、轻松购物";
  },
};
</script>

<style scoped>
.store-home {
  min-width: 1200px;
  background-color: #edfdf8;
  overflow: auto;
}
</style>