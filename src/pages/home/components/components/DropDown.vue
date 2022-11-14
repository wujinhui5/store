<template>
  <dl class="drop-down">
    <dt>全部商品分类</dt>
    <dd
      v-for="(item, index) in shopSort"
      :key="index"
      @mouseenter="openDetailBox(index)"
      @mouseleave="detailBoxStyle[index] = false"
    >
      <a href="javascript:;"
        >{{ item }}
        <div class="detail-sort" v-if="detailBoxStyle[index]">
          <div class="tip" v-if="!detailSort[index]">暂时没有这个分类</div>
          <div v-for="(item, idx) in detailSort[index]" :key="idx">
            <span class="title">{{ item.title }}</span>
            <ul>
              <li v-for="(ite, i) in item.sort" :key="i">{{ ite.title }}</li>
            </ul>
          </div>
        </div></a
      >
    </dd>
  </dl>
</template>

<script>
import { reactive } from "vue";
import { getShopSortApi } from "@/utils/shop";

export default {
  setup() {
    let shopSort = [
      "家用电器",
      "手机、数码、通信",
      "电脑、办公",
      "家居、家具、家装、厨具",
      "男装、女装、童装、内衣",
      "化妆用品",
      "箱包、珠宝、钟表",
      "运动户外",
      "汽车、汽车用品",
      "母婴、玩具乐器",
      "食品、酒类、生鲜",
      "医药保健",
      "图书、音像、电子书",
      "彩票、旅行、充值、票务",
      "宠物用品",
    ];
    let detailBoxStyle = reactive(new Array(15).fill(false));
    // 存储分类详细
    let detailSort = reactive(new Array(15));

    // 打开商品分类详细列表
    function openDetailBox(i) {
      detailBoxStyle[i] = true;
      if (detailSort[i]) return;
      getShopSortApi(JSON.stringify({ index: i }))
        .then((res) => {
          let data = JSON.parse(res.data, 2);
          if (data.meta.status !== 200) {
            console.log(data.meta.msg);
            return;
          }
          detailSort[i] = data.data;
        })
        .catch((err) => console.log(err));
    }

    return {
      shopSort,
      detailBoxStyle,
      detailSort,
      openDetailBox,
    };
  },
};
</script>

<style lang="less" scoped>
.drop-down {
  position: relative;
  float: left;
  width: 209px;
  height: 512px;
  color: #fff;
  dt {
    width: 209px;
    height: 47px;
    background-color: #b1191a;
    font-size: 16px;
    line-height: 47px;
    text-align: center;
  }
  dd {
    background-color: #c81623;
    a {
      display: block;
      height: 31px;
      margin-left: 1px;
      padding: 0 5px 0 10px;
      background-color: #c81623;
      font-size: 14px;
      line-height: 31px;
      color: #fff;
      &:hover {
        background-color: #f7f7f7;
        color: #c81623;
        &::after {
          content: "\e920";
          font-family: "icomoon";
          float: right;
        }
      }
      .detail-sort {
        position: absolute;
        top: 47px;
        right: -598px;
        z-index: 10;
        width: 600px;
        height: 465px;
        border: 1px solid #666;
        border-radius: 5px;
        box-shadow: 3px 3px 5px #333;
        background: #f1f1f1;
        font-size: 12px;
        div {
          padding: 10px;
          line-height: 20px;
          .title {
            display: inline-block;
            margin-right: 5px;
            width: 70px;
            color: #333;
            font-weight: 700;
            text-align: right;
            &::after {
              content: "\e920";
              font-family: "icomoon";
              margin-left: 8px;
            }
          }
          ul {
            display: inline-block;
            li {
              display: inline-block;
              padding: 0 5px;
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>