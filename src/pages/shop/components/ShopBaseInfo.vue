<template>
  <div class="shop-base-info">
    <div class="title">{{ info.title }}</div>
    <div class="info-box">
      <div class="price-box">
        <span>品 优 价</span>
        <span>&#65509;</span>
        <span class="price">{{ info.price }}</span>
      </div>
      <div class="discount" v-if="info.discount">
        <span>优 惠 券</span>
        <span>{{ info.discount }}</span>
      </div>
    </div>
    <div class="add-in-car">
      <div class="input-num fl">
        <input type="text" class="fl" v-model="shop.num" @keyup="inspectNum" />
        <a
          href="javascript:;"
          class="add"
          @click="addNum"
          :style="
            shop.num === 200 ? { color: '#ccc', cursor: 'not-allowed' } : {}
          "
          >+</a
        >
        <a
          href="javascript:;"
          class="minus"
          @click="minusNum"
          :style="
            shop.num === 1 ? { color: '#ccc', cursor: 'not-allowed' } : {}
          "
          >-</a
        >
      </div>
      <a href="javascript:;" class="a-add-car fl" @click="addToShopCar"
        >加入购物车</a
      >
    </div>
  </div>
</template>

<script>
import { reactive, toRefs, inject } from "vue";
import { addToShopCarApi } from "@/utils/shop";
import { ElMessage } from "element-plus";
import router from "@/router";
import { useStore } from "vuex";
import "element-plus/es/components/message/style/css";

export default {
  props: ["info"],
  setup(props) {
    let shop = reactive({
      num: 1,
    });

    // 定时自动修正购买数量
    let timer;
    function formatNum(num) {
      num = parseInt(num) ? parseInt(num) : 1;
      num = num < 1 ? 1 : num;
      num = num > 200 ? 200 : num;
      return num;
    }
    function inspectNum() {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        shop.num = formatNum(shop.num);
      }, 1000);
    }

    // 增加购买数量
    function addNum() {
      let temp = formatNum(shop.num);
      shop.num = temp < 200 ? temp + 1 : temp;
    }

    // 减少购买数量
    function minusNum() {
      let temp = formatNum(shop.num);
      shop.num = temp > 1 ? temp - 1 : temp;
    }

    // 加购
    let store = useStore();
    let reload = inject("reload");
    function addToShopCar() {
      if (!store.state.user.phone) {
        router.push("/login");
      }
      let reqData = JSON.stringify({
        phone: store.state.user.phone,
        shopId: props.info.shopId,
        num: shop.num,
      });
      addToShopCarApi(reqData).then((res) => {
        let resData = JSON.parse(res.data);
        if (resData.meta.status === 999) {
          // 走退出登录逻辑
        } else if (resData.meta.status === 998) {
          ElMessage.error(resData.meta.msg);
          reload();
        } else {
          ElMessage.success(resData.meta.msg);
          if (resData.data) store.commit("user/SET_SHOPCARNUM", resData.data);
          router.push("/shopcar");
        }
      });
    }

    return {
      ...toRefs(props),
      shop,
      inspectNum,
      addNum,
      minusNum,
      addToShopCar,
    };
  },
};
</script>

<style lang="less" scoped>
.shop-base-info {
  width: 600px;
  .title {
    font: 700 16px Arial, "microsoft yahei";
    color: #666;
    padding-top: 10px;
    line-height: 28px;
  }
  .info-box {
    margin-top: 10px;
    padding: 5px 10px;
    background: #f3f3f3;
    font-size: 14px;
    line-height: 32px;
    .price-box {
      vertical-align: middle;
      span {
        &:nth-child(1) {
          color: #999;
        }
        &:nth-child(2) {
          display: inline-block;
          margin: 0 5px 0 20px;
          font-size: 16px;
          color: #c81623;
        }
        &:nth-child(3) {
          font-size: 22px;
          color: #c81623;
        }
      }
    }
    .discount {
      span {
        &:nth-child(1) {
          color: #999;
        }
        &:nth-child(2) {
          display: inline-block;
          position: relative;
          height: 18px;
          margin-left: 20px;
          padding: 0 10px;
          border: 1px solid #c81623;
          border-left: 0;
          border-right: 0;
          background: #f8c8ca;
          line-height: 16px;
          color: #c81623;
          &::before {
            content: "";
            position: absolute;
            width: 2px;
            height: 17px;
            background: url(../../../../public/images/quan-arr.gif) no-repeat;
            left: 0;
          }
          &::after {
            content: "";
            position: absolute;
            width: 2px;
            height: 17px;
            background: url(../../../../public/images/quan-arr.gif) no-repeat -2px
              0;
            right: 0;
          }
        }
      }
    }
  }
  .add-in-car {
    padding: 10px 5px;
    height: 64px;
    .input-num {
      position: relative;
      width: 58px;
      height: 44px;
      border: 1px solid #ccc;
      border-radius: 3px;
      text-align: center;
      input {
        width: 42px;
        height: 42px;
        border: 0;
        outline: none;
        text-align: center;
      }
      a {
        position: absolute;
        right: -1px;
        width: 14px;
        height: 22.5px;
        border: 1px solid #ccc;
        background: #f1f1f1;
        color: #666;
        line-height: 22.5px;
      }
      .add {
        top: -1px;
        border-radius: 3px 3px 0 0;
      }
      .minus {
        bottom: -1px;
        border-radius: 0 0 3px 3px;
      }
    }
    .a-add-car {
      height: 44px;
      margin-left: 5px;
      padding: 0 26px;
      background-color: #c81623;
      color: #fff;
      font-weight: 700;
      font-size: 18px;
      line-height: 44px;
    }
  }
}
</style>