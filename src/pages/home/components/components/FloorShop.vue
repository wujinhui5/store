<template>
  <div class="floor-shop">
    <router-link :to="`/shop?shopId=${props.data.shopId}`" class="pic">
      <div class="img">
        <img :src="props.data.imgUrl" />
      </div>
      <div class="title">{{ props.data.title }}</div>
      <div class="price">
        <span>¥</span>
        <span>{{ props.data.price }}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["data"],
  setup(props) {
    return {
      props,
    };
  },
};
</script>

<style lang="less" scoped>
.floor-shop {
  display: inline-block;
  width: 192px;
  margin: 0 10px 10px 0;
  border-radius: 5px;
  box-shadow: 2px 2px 5px #4e4e4e;
  background: #fff;
  overflow: hidden;
  &:nth-child(5n) {
    margin-right: 0;
  }
  &:hover .img::before {
    display: block;
  }
  &:hover .title {
    color: #c81623;
  }
  .img {
    position: relative;
    width: 192px;
    height: 192px;
    img {
      width: 100%;
      height: 100%;
    }
    &::before {
      position: absolute;
      top: 0;
      left: 0;
      display: none;
      content: "";
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.1);
    }
  }
  .title {
    margin: 11px 0;
    padding: 0 5px;
    font-size: 16px;
    color: rgb(42, 49, 69);
    line-height: 22px;
    height: 44px;
    overflow: hidden;
  }
  .price {
    margin-bottom: 11px;
    padding: 0 5px;
    color: #c81623;
    font-size: 16px;
    .fractionalPart {
      font-size: 12px;
    }
  }
}
</style>