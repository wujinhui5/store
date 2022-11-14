<template>
  <div class="position-nav" :style="navStyle">
    <ul>
      <li><router-link to="/shopcar">购物车</router-link></li>
      <li><router-link to="/order">我的订单</router-link></li>
      <li><a href="javascript:;" @click="toView">顶部</a></li>
    </ul>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  setup() {
    let navStyle = reactive({
      position: "absolute",
      top: "647px",
    });
    function documentScroll(y, distance) {
      document.addEventListener("scroll", () => {
        if (window.pageYOffset >= y) {
          navStyle.position = "fixed";
          navStyle.top = `${distance}px`;
        } else {
          navStyle.position = "absolute";
          navStyle.top = `${y + distance}px`;
        }
      });
    }
    documentScroll(547, 100);

    function toView() {
      document.getElementById("toTop").scrollIntoView();
    }

    return {
      navStyle,
      toView,
    };
  },
};
</script>

<style scoped>
.position-nav {
  position: absolute;
  top: 647px;
  right: 0;
  width: 50px;
  background-color: rgba(0, 0, 0, 0.4);
  font-size: 12px;
  text-align: center;
}

ul li a {
  display: block;
  padding: 10px;
  color: #fff;
}

ul li a:hover {
  background-color: #c81623;
}
</style>