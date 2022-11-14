<template>
  <div class="shop-slide">
    <div class="pic-container">
      <div
        class="event"
        @mousemove="magnifyPic($event)"
        @mouseleave="notMagnify"
      ></div>
      <div class="mask" :style="maskStyle" ref="elMask"></div>
      <div class="pic-box" ref="elPic">
        <ul :style="slideStyle">
          <li v-for="(item, index) in shopImgUrls" :key="index">
            <img :src="item" alt="图片" />
          </li>
        </ul>
      </div>
      <div class="bigger" :style="biggerStyle"></div>
    </div>

    <div class="list-box">
      <span
        :class="`icon icon-cheveron-left ${isActive.left ? 'active' : ''}`"
        @click="changePage(page.currentPage - 1)"
      ></span>
      <div class="list">
        <ul :style="listStyle">
          <li
            :style="{ border: border[index] }"
            v-for="(item, index) in shopImgUrls"
            :key="index"
            @mouseenter="chooseImg(index)"
          >
            <img :src="item" alt="图片" />
          </li>
        </ul>
      </div>
      <span
        :class="`icon icon-cheveron-right ${isActive.right ? 'active' : ''}`"
        @click="changePage(page.currentPage + 1)"
      ></span>
    </div>
  </div>
</template>

<script>
import { reactive, computed, watch, ref } from "vue";

export default {
  props: ["imgUrls"],
  setup(props) {
    watch(
      () => props.imgUrls,
      (newValue) => {
        for (let i in newValue) shopImgUrls.push(newValue[i]);
        slideStyle.width = `${350 * newValue.length}px`;
        for (let i in newValue) border.push(""); // eslint-disable-line no-unused-vars
        page.pageNum = Math.ceil(newValue.length / 5);
        biggerStyle.background = `url(${newValue[0]}) no-repeat`;
      }
    );
    let shopImgUrls = reactive([]);
    let slideStyle = reactive({
      width: "",
      left: "",
    });
    let listStyle = reactive({
      left: "",
    });
    let border = reactive([]);
    let page = reactive({
      pageNum: 1,
      currentPage: 1,
    });
    let biggerStyle = reactive({
      background: "",
      display: "none",
      backgroundPosition: "",
      backgroundSize: "1750px 1750px",
    });
    let maskStyle = reactive({
      display: "none",
      left: "0",
      top: "0",
    });
    let isActive = computed(() => {
      return {
        left: page.currentPage > 1,
        right: page.currentPage < page.pageNum,
        a: props["imgUrls"],
      };
    });

    // 放大图片
    let elMask = ref(null);
    let elPic = ref(null);
    function magnifyPic(e) {
      let x = e.offsetX - elMask.value.offsetWidth / 2;
      let y = e.offsetY - elMask.value.offsetHeight / 2;
      function formatCoord(a) {
        a = a < 0 ? 0 : a;
        a = a > 250 ? 250 : a;
        return a;
      }
      x = formatCoord(x);
      y = formatCoord(y);
      maskStyle.display = "block";
      biggerStyle.display = "block";
      maskStyle.left = x + "px";
      maskStyle.top = y + "px";
      let per = 5;
      biggerStyle.backgroundPosition = `${-x * per}px ${-y * per}px`;
    }

    //  取消放大
    function notMagnify() {
      maskStyle.display = "none";
      biggerStyle.display = "none";
    }

    // 切换图片
    function chooseImg(i) {
      slideStyle.left = `${-i * 350}px`;
      for (let i in border) {
        border[i] = "";
      }
      border[i] = "2px solid #c81623";
      biggerStyle.background = `url(${shopImgUrls[i]}) no-repeat`;
    }

    // 换页
    function changePage(i) {
      if (i < 1 || i > page.pageNum) return;
      page.currentPage = i;
      if (i === page.pageNum) {
        listStyle.left = `${
          (1 - page.currentPage) * 59 * (shopImgUrls.length % 5)
        }px`;
        return;
      }
      listStyle.left = `${(1 - page.currentPage) * 290}px`;
    }

    return {
      shopImgUrls,
      slideStyle,
      listStyle,
      border,
      biggerStyle,
      maskStyle,
      page,
      elMask,
      elPic,
      isActive,
      chooseImg,
      changePage,
      magnifyPic,
      notMagnify,
    };
  },
};
</script>

<style lang="less" scoped>
.shop-slide {
  width: 350px;
  .pic-container {
    position: relative;
    margin-bottom: 10px;
    width: 100%;
    height: 350px;
    .pic-box {
      position: relative;
      width: 100%;
      height: 100%;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      overflow: hidden;
      ul {
        position: absolute;
        left: 0;
        transition: 0.5s;
        li {
          float: left;
          height: 100%;
          width: 350px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .event {
      position: absolute;
      z-index: 999;
      width: 100%;
      height: 100%;
    }
    .mask {
      content: "";
      position: absolute;
      width: 100px;
      height: 100px;
      z-index: 99;
      background-color: rgba(255, 217, 0, 0.4);
      cursor: move;
    }
    .bigger {
      content: "";
      position: absolute;
      top: 0;
      right: -500px;
      z-index: 99;
      width: 500px;
      height: 500px;
    }
  }

  .list-box {
    height: 54px;
    .list {
      position: relative;
      float: left;
      width: 290px;
      height: 100%;
      overflow: hidden;
      ul {
        position: absolute;
        height: 100%;
        left: 0;
        transition: 0.5s;
        zoom: 1;
        li {
          float: left;
          margin: 0 2px;
          border: 2px solid #fff;
          width: 54px;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .icon {
      float: left;
      height: 100%;
      transform: scaleY(1.5);
      font-family: "icomoon";
      color: rgb(177, 177, 177);
      font-size: 30px;
      line-height: 54px;
      text-align: center;
      cursor: pointer;
    }
    .icon-cheveron-left::before {
      content: "\e91f";
    }
    .icon-cheveron-right::before {
      content: "\e920";
    }
    .active:hover {
      color: #555;
    }
  }
}
</style>