<template>
  <div class="shop-page">
    <TopNav />
    <AppHeader />
    <StoreNav />
    <div class="shop-info clearfix">
      <div class="fl">
        <ShopSlide :imgUrls="shopData.shopImgUrls" />
      </div>
      <div class="fr">
        <ShopBaseInfo :info="shopData.baseInfo" />
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import TopNav from "@/components/topNav/TopNav";
import StoreNav from "./components/StoreNav";
import AppHeader from "@/components/header/AppHeader";
import ShopSlide from "./components/ShopSlide";
import ShopBaseInfo from "./components/ShopBaseInfo";
import AppFooter from "@/components/footer/AppFooter";
import { reactive } from "vue";
import { getShopInfoApi } from "@/utils/shop";
import { useRoute } from "vue-router";

export default {
  components: {
    TopNav,
    AppHeader,
    AppFooter,
    StoreNav,
    ShopSlide,
    ShopBaseInfo,
  },
  setup() {
    let shopData = reactive({
      shopImgUrls: [],
      baseInfo: {
        storeId: "",
        shopId: "",
        title: "",
        price: "",
        discount: "",
      },
    });
    let data = 1;

    // 获取商品信息
    function getShopInfo() {
      let $route = new useRoute();
      getShopInfoApi({ shopId: $route.query.shopId })
        .then((res) => {
          let data = JSON.parse(res.data);
          if (data.meta.status === 200) {
            shopData.shopImgUrls = data.data.shopImgUrls;
            for (let k in shopData.baseInfo)
              shopData.baseInfo[k] = data.data[k];
            document.title = shopData.baseInfo.title;
          } else {
            //这部分以后再说
            console.log("获取失败");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    getShopInfo();

    return {
      shopData,
      data,
    };
  },
};
</script>

<style lang="less" scoped>
.shop-info {
  width: 980px;
  margin: 0 auto;
  padding: 5px 0;
  .base-info {
    width: 600px;
    height: 500px;
    background: green;
  }
}
</style>