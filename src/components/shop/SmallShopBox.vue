<template>
  <router-link
    class="small-shop-box"
    :to="{
      path: '/shop',
      query: query,
    }"
  >
    <div class="img fl"><img :src="imgUrl" /></div>
    <span class="title fl">{{ title }}</span>
  </router-link>
</template>

<script>
import { toRefs } from "vue";

export default {
  props: {
    query: {
      type: Object,
    },
    imgUrl: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  setup(props) {
    return {
      ...toRefs(props),
    };
  },
};
</script>

<style lang="less" scoped>
.small-shop-box {
  display: block;
  width: 300px;
  height: 82px;
  color: #666;
  &:hover {
    color: #c81623;
  }
  .img {
    width: 82px;
    height: 82px;
    border: 1px solid #eee;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .title {
    width: 218px;
    height: 40px;
    padding-left: 5px;
    line-height: 20px;
    overflow: hidden;
  }
}
</style>