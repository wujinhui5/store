<template>
  <div class="w main-floor" id="jiadian">
    <h2>{{ props.data.title }}</h2>
    <div class="floor-shop-box">
      <FloorShop
        v-for="(item, index) in props.data.data"
        :key="index"
        :data="item"
      />
    </div>
  </div>
</template>

<script>
import FloorShop from "./FloorShop";

export default {
  components: { FloorShop },
  props: ["data"],
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style lang="less" scoped>
.main-floor {
  width: 1000px;
  margin: 20px auto;
  h2 {
    margin-bottom: 20px;
    font-size: 45px;
    color: #c81623;
    text-align: center;
    line-height: 63px;
  }
}
</style>