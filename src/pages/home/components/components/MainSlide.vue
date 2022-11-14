<template>
  <div class="main-slide" @mouseenter="timerOff" @mouseleave="timerOn">
    <button
      class="icon left"
      @click="last"
      :disabled="butDisabled.left"
    ></button>
    <button
      class="icon right"
      @click="next"
      :disabled="butDisabled.right"
    ></button>
    <div class="dot">
      <ul v-if="slideData">
        <li
          :class="`${dotsClass[index]}`"
          v-for="(item, index) in dotsClass"
          :key="index"
          @mouseenter="changeActiveDot(index)"
        >
          {{ index + 1 }}
        </li>
      </ul>
    </div>
    <ul :style="ulStyle" ref="slideUl">
      <li v-for="(item, index) in slideData" :key="index">
        <router-link
          :to="{
            path: '/shop',
            query: { storeId: item.storeId, shopId: item.shopId },
          }"
        >
          <img :src="item.imgUrl" />
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { getSlideDataApi } from "@/utils/shop";
import { reactive, ref, toRefs, onBeforeUnmount } from "vue";

export default {
  setup() {
    let ulStyle = reactive({
      width: "",
      left: "-721px",
      transition: ".3s",
    });
    let reactiveData = reactive({
      slideData: [],
      dotsClass: [],
    });

    // 获取轮播图图片
    function getSlideData() {
      getSlideDataApi()
        .then((res) => {
          let data = JSON.parse(res.data);
          if (data.meta.status != 200) {
            console.log(data.meta.msg);
            return;
          }
          ulStyle.width = `${(data.data.length + 2) * 721}px`;
          reactiveData.dotsClass = new Array(data.data.length);
          reactiveData.dotsClass[0] = "active";
          reactiveData.slideData = data.data;
          reactiveData.slideData.unshift(data.data[data.data.length - 1]);
          reactiveData.slideData.push(data.data[1]);
        })
        .catch((err) => console.log(err));
    }
    getSlideData();

    let slideUl = ref(null);
    let butDisabled = reactive({
      left: false,
      right: false,
    });
    // 上一张图片
    function last() {
      let index = parseInt(ulStyle.left) / -721 - 1;
      ulStyle.transition = ".3s";
      ulStyle.left = `${-721 * index}px`;
      if (index > 0) {
        resetDot(index - 1);
        return;
      }
      resetDot(reactiveData.slideData.length - 3);
      butDisabled.left = true;
      let callback = () => {
        ulStyle.transition = "";
        ulStyle.left = `${-(reactiveData.slideData.length - 2) * 721}px`; // eslint-disable-line no-unused-vars
        slideUl.value.removeEventListener("transitionend", callback);
        butDisabled.left = false;
      };
      slideUl.value.addEventListener("transitionend", callback);
    }

    // 下一张
    function next() {
      let index = parseInt(ulStyle.left) / -721 + 1;
      ulStyle.transition = ".3s";
      ulStyle.left = `${-721 * index}px`;
      if (index < reactiveData.slideData.length - 1) {
        resetDot(index - 1);
        return;
      }
      resetDot(0);
      butDisabled.right = true;
      let callback = () => {
        ulStyle.transition = "";
        ulStyle.left = `-721px`;
        butDisabled.right = false;
        slideUl.value.removeEventListener("transitionend", callback);
      };
      slideUl.value.addEventListener("transitionend", callback);
    }

    // 重置小圆点样式
    function resetDot(index) {
      for (let i in reactiveData.dotsClass) reactiveData.dotsClass[i] = "";
      reactiveData.dotsClass[index] = "active";
    }

    // 通过小圆点切换当前图片
    function changeActiveDot(index) {
      resetDot(index);
      ulStyle.left = `${-721 * (index + 1)}px`;
    }

    let timer;
    function timerOn() {
      timer = setInterval(() => {
        next();
      }, 2000);
    }
    timerOn();

    function timerOff() {
      clearInterval(timer);
    }

    // 清除定时器
    onBeforeUnmount(() => {
      clearInterval(timer);
    });

    return {
      ...toRefs(reactiveData),
      ulStyle,
      reactiveData,
      slideUl,
      butDisabled,
      timerOn,
      timerOff,
      last,
      next,
      changeActiveDot,
    };
  },
};
</script>

<style lang="less" scoped>
.main-slide {
  position: relative;
  float: left;
  width: 721px;
  height: 455px;
  margin: 10px 0 0 10px;
  overflow: hidden;
  ul {
    position: absolute;
    height: 100%;
    li {
      float: left;
      width: 721px;
      height: 100%;
      a {
        display: block;
        width: 100%;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .icon {
    position: absolute;
    float: left;
    top: 50%;
    z-index: 9;
    margin-top: -17.5px;
    width: 25px;
    height: 35px;
    border: 0;
    background: rgba(0, 0, 0, 0.3);
    color: #f1f1f1;
    font-family: "icomoon";
    font-size: 18px;
    line-height: 35px;
    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .left {
    left: 0;
    border-radius: 0 16px 16px 0;
    &::before {
      margin-right: 3.5px;
      content: "\e91f";
    }
  }
  .right {
    right: 0;
    border-radius: 16px 0 0 16px;
    &::before {
      margin-left: 3.5px;
      content: "\e920";
    }
  }
  .dot {
    position: absolute;
    bottom: 20px;
    left: 50px;
    z-index: 2;
    height: 20px;
    ul {
      width: 600px;
      height: 100%;
      li {
        width: 20px;
        height: 20px;
        margin: 3px 8px;
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        line-height: 20px;
        text-align: center;
        &.active {
          background: #c81623;
        }
      }
    }
  }
}
</style>