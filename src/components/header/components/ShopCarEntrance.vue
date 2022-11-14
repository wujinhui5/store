<template>
  <router-link class="shop-car-entrance fr" to="/shopcar">
    <span>我的购物车</span>
    <div class="count" :style="style">{{ num }}</div>
  </router-link>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    let store = useStore();
    let style = computed(() => {
      if (num.value === "...") return { lineHeight: "7px" };
      return {};
    });
    let num = computed(() => {
      let num = store.state.user.shopCarNum;
      if (num > 99) {
        num = "...";
      }
      return num;
    });

    return { num, style };
  },
};
</script>

<style lang="less" scoped>
.shop-car-entrance {
  position: relative;
  display: block;
  width: 140px;
  height: 36px;
  margin-right: 64px;
  border: 1px solid #dfdfdf;
  color: #666;
  font-size: 12px;
  text-align: center;
  line-height: 34px;
  &::before {
    content: "\e93a";
    font-family: "icomoon";
    margin-right: 5px;
    color: #da5555;
  }

  &::after {
    content: "\e920";
    font-family: "icomoon";
    margin-left: 10px;
  }

  &:hover {
    color: #c81623;
  }
  .count {
    position: absolute;
    top: -4px;
    left: 105px;
    min-width: 14px;
    height: 14px;
    padding: 0 4px;
    border-radius: 7px 7px 7px 0;
    background-color: #e60012;
    color: #fefefe;
    line-height: 14px;
  }
}
</style>