<template>
  <div class="main">
    <div class="shop-menu">
      <div class="w shop-menu-header">
        <DropDown />
        <MainTopNav />
      </div>
      <div class="w shop-menu-main">
        <MainSlide />
        <div class="right-container">
          <MainBanner />
          <MainBulletin />
          <RightNav />
        </div>
      </div>
    </div>
    <div class="floor">
      <MainFloor v-for="(item, index) in shops" :key="index" :data="item" />
    </div>
  </div>
</template>

<script>
import DropDown from "./components/DropDown";
import MainTopNav from "./components/MainTopNav";
import MainSlide from "./components/MainSlide";
import MainBulletin from "./components/MainBulletin";
import RightNav from "./components/RightNav";
import MainBanner from "./components/MainBanner";
import MainFloor from "./components/MainFloor";
import { getShopsApi } from "@/utils/shop";
import { reactive } from "vue";

export default {
  components: {
    DropDown,
    MainTopNav,
    MainSlide,
    MainBulletin,
    RightNav,
    MainBanner,
    MainFloor,
  },
  setup() {
    let shops = reactive([]);

    // 获取商品列表
    function getShops() {
      getShopsApi()
        .then((res) => {
          let data = JSON.parse(res.data);
          if (data.meta.status === 200) {
            for (let k in data.data) shops[k] = data.data[k];
          }
        })
        .catch((err) => console.log(err));
    }
    getShops();

    return {
      shops,
    };
  },
};
</script>

<style scoped>
.main .shop-menu {
  min-width: 1200px;
  height: 512px;
}

.main .shop-menu-header {
  height: 47px;
  border-bottom: 2px solid #b1191a;
}

.main .shop-menu-main {
  height: 465px;
}

.main .shop-menu-main .right-container {
  float: right;
  width: 250px;
  font-size: 14px;
}

</style>