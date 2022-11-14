<template>
  <div class="shops-list">
    <template v-if="!(data.shops == false)">
      <div class="all-box">
        <span>全部商品&nbsp;</span>
        <span class="all">{{ totalShops }}</span>
      </div>
      <table>
        <thead>
          <tr>
            <td>
              <input
                type="checkbox"
                class="checkbox"
                v-model="data.allIsChoose"
                @click="changeAllIsChoose"
              />
              全选
            </td>
            <td>商品</td>
            <td>单价</td>
            <td>数量</td>
            <td>小计</td>
            <td>操作</td>
          </tr>
        </thead>
        <tbody>
          <template v-for="(item, index) in data.shops" :key="index">
            <tr class="store">
              <td>
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="data.storeIsChoose[index]"
                  @click="changeIsChoose(index)"
                />
              </td>
              <td>{{ item.storeName }}</td>
            </tr>
            <tr class="shop-box" v-for="(ite, idx) in item.data" :key="idx">
              <td>
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="data.shopIsChoose[index][idx]"
                  @click="changeShopIsChoose(index, idx)"
                />
              </td>
              <td>
                <SmallShopBox
                  :title="ite.title"
                  :imgUrl="ite.imgUrl"
                  :query="{ storeId: item.storeId, shopId: ite.shopId }"
                />
              </td>
              <td>&#65509;{{ ite.price }}</td>
              <td>
                <div class="num-box">
                  <button
                    class="but-minus fl"
                    @click="minusNum(index, idx)"
                    :style="
                      ite.num === 1
                        ? { color: '#ccc', cursor: 'not-allowed' }
                        : {}
                    "
                  >
                    -
                  </button>
                  <input
                    type="text"
                    v-model="ite.num"
                    class="fl"
                    @keyup="inspectNum(index, idx)"
                  />
                  <button
                    class="but-add fl"
                    @click="addNum(index, idx)"
                    :style="
                      ite.num === 200
                        ? { color: '#ccc', cursor: 'not-allowed' }
                        : {}
                    "
                  >
                    +
                  </button>
                </div>
              </td>
              <td class="total">&#65509;{{ ite.price * ite.num }}</td>
              <td class="but-delete" @click="deleteShop(ite.shopId)">删除</td>
            </tr>
          </template>
        </tbody>
      </table>
      <div class="settle-acount-entrance">
        <div class="fl">
          <div class="checkbox-box">
            <input
              type="checkbox"
              class="checkbox"
              v-model="data.allIsChoose"
              @click="changeAllIsChoose"
            />全选
          </div>
          <span class="but-delete" @click="deleteShop('')">删除选中商品</span>
          <div class="total-price fr">总价&#65509;{{ targetShops.sum }}</div>
        </div>
        <div class="but-settle-acount fr">
          <a href="javascript:;" @click="settleAccount">结算</a>
        </div>
      </div></template
    >
    <template v-if="data.shops == false">
      <div class="tip">
        <h2 class="title">当前购物车没有商品！</h2>
        <router-link to="/">点击前往购物</router-link>
      </div>
    </template>
  </div>
</template>

<script>
import SmallShopBox from "@/components/shop/SmallShopBox";
import { reactive, computed, inject } from "vue";
import { getShopCarApi, deleteShopApi, settleAccountApi } from "@/utils/shop";
import { useStore } from "vuex";
import router from "@/router";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

export default {
  components: { SmallShopBox },
  setup() {
    let data = reactive({
      shops: [],
      shopIsChoose: [],
      storeIsChoose: [],
      allIsChoose: false,
    });

    // 获取购物车商品
    let store = useStore();
    function getShopCar() {
      let reqData = { phone: store.state.user.phone };
      getShopCarApi(reqData)
        .then((res) => {
          let resData = JSON.parse(res.data);
          if (resData.meta.status != 200) {
            // 走登出逻辑
            return;
          }
          data.shops = resData.data;
          data.shops.forEach((i) => {
            data.shopIsChoose.push(new Array(i.data.length).fill(false));
            data.storeIsChoose.push(false);
          });
        })
        .catch((err) => console.log(err));
    }
    getShopCar();

    // 统计购物车内商品数
    let totalShops = computed(() => {
      let temp = 0;
      data.shops.forEach((i) => {
        temp = temp + i.data.length;
      });
      return temp;
    });

    // 店内商品全选
    function changeIsChoose(index) {
      data.shopIsChoose[index].fill(!data.storeIsChoose[index]);
      if (data.storeIsChoose[index]) {
        data.allIsChoose = false;
        return;
      }
      for (let i = 0; i < data.storeIsChoose.length; i++) {
        if (i != index && !data.storeIsChoose[i]) return;
      }
      data.allIsChoose = true;
    }

    // 统计选中的商品
    let targetShops = computed(() => {
      let result = {
        sum: 0,
        shopId: [],
        num: [],
      };
      let choose = data.shopIsChoose;
      let shops = data.shops;
      choose.forEach((item, i) => {
        item.forEach((ite, j) => {
          if (ite) {
            result.sum =
              result.sum + shops[i].data[j].num * shops[i].data[j].price;
            result.shopId.push(shops[i].data[j].shopId);
            result.num.push(shops[i].data[j].num);
          }
        });
      });
      return result;
    });

    // 删除商品
    let reload = inject("reload");
    function deleteShop(id) {
      let shopId = [];
      // 当传入某个商品id时删除单个商品
      if (id) {
        shopId.push(id);
      } else {
        // 否则，统计选中
        shopId = targetShops.value.shopId;
        if (shopId == false) {
          ElMessage.error("当前没有选中商品！");
          return;
        }
      }
      let reqData = { phone: store.state.user.phone, shopId };

      // 发送请求
      deleteShopApi(reqData)
        .then((res) => {
          let resData = JSON.parse(res.data);
          if (resData.meta.status === 200) {
            ElMessage.success(resData.meta.msg);
            if (resData.data || resData.data === 0)
              store.commit("user/SET_SHOPCARNUM", resData.data);
            reload();
          } else if (resData.meta.status === 998) {
            ElMessage.error(resData.meta.msg);
            reload();
          } else {
            // 退出登录
          }
        })
        .catch((err) => console.log(err));
    }

    // 购物车内所有商品全选
    function changeAllIsChoose() {
      data.storeIsChoose.fill(!data.allIsChoose);
      data.shopIsChoose.forEach((i) => {
        i.fill(!data.allIsChoose);
      });
    }

    // 修改商品选中状态
    function changeShopIsChoose(index, idx) {
      if (data.shopIsChoose[index][idx]) {
        data.storeIsChoose[index] = false;
        data.allIsChoose = false;
        return;
      }
      let temp = data.shopIsChoose;
      for (let i in temp[index]) {
        if (i != idx && !temp[index][i]) return;
      }
      data.storeIsChoose[index] = true;
      for (let i = 0; i < temp.length; i++) {
        if (i === index) continue;
        for (let j in temp[i]) {
          if (!temp[i][j]) return;
        }
      }
      data.allIsChoose = true;
    }

    // 修正购买数量
    let timer;
    function formatNum(num) {
      num = parseInt(num) ? parseInt(num) : 1;
      num = num < 1 ? 1 : num;
      num = num > 200 ? 200 : num;
      return num;
    }

    // input框内输入购买数量
    function inspectNum(index, idx) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        data.shops[index].data[idx].num = formatNum(
          data.shops[index].data[idx].num
        );
      }, 1000);
    }

    // 增加购买数量
    function addNum(index, idx) {
      let temp = formatNum(data.shops[index].data[idx].num);
      data.shops[index].data[idx].num = temp < 200 ? temp + 1 : temp;
    }

    // 减少购买数量
    function minusNum(index, idx) {
      let temp = formatNum(data.shops[index].data[idx].num);
      data.shops[index].data[idx].num = temp > 1 ? temp - 1 : temp;
    }

    // 结算
    function settleAccount() {
      if (targetShops.value.shopId == false) {
        ElMessage.error("请选择想要结算的商品！");
        return;
      }
      let reqData = JSON.stringify({
        phone: store.state.user.phone,
        shopId: targetShops.value.shopId,
        num: targetShops.value.num,
      });
      settleAccountApi(reqData)
        .then((res) => {
          let resData = JSON.parse(res.data);
          if (resData.meta.status === 200) {
            ElMessage.success("结算成功！");
            store.commit("user/SET_SHOPCARNUM", resData.data);
            router.push("/order");
          } else {
            // 退出登录
          }
        })
        .catch((err) => console.log(err));
    }

    return {
      data,
      targetShops,
      totalShops,
      addNum,
      minusNum,
      inspectNum,
      changeIsChoose,
      changeAllIsChoose,
      changeShopIsChoose,
      deleteShop,
      settleAccount,
    };
  },
};
</script>

<style lang="less" scoped>
.shops-list {
  width: 1000px;
  margin: 0 auto;
  .all-box {
    height: 40px;
    margin-top: 10px;
    color: #c81723;
    font-size: 16px;
    line-height: 44px;
  }
  .checkbox {
    vertical-align: -2px;
  }
  .but-delete {
    cursor: pointer;
    &:hover {
      color: #c81623;
    }
  }
  table {
    display: block;
    border-spacing: 0;
    tr {
      display: block;
      td:nth-child(1) {
        width: 35px;
        padding: 0 11px;
      }
      td:nth-child(2) {
        width: 450px;
      }
      td:nth-child(4) {
        width: 100px;
        text-align: center;
      }
      td:nth-child(3),
      td:nth-child(5) {
        width: 170px;
        padding-right: 30px;
        text-align: right;
      }
      td:nth-child(6) {
        width: 75px;
      }
    }
    thead {
      display: block;
      height: 42px;
      margin-bottom: 10px;
      padding: 5px 0;
      border: 1px solid #e9e9e9;
      background: #f3f3f3;
      border-top: 0;
      color: #434343;
      line-height: 31px;
      tr {
        td:nth-child(1) {
          width: 134px;
        }
        td:nth-child(2) {
          width: 350px;
        }
        td:nth-child(6) {
          width: 74px;
        }
      }
    }
    tbody {
      tr {
        border-top: 1px solid #aaa;
        &.store {
          height: 32px;
          border: 0;
          border-bottom: 1px solid #aaa;
          color: #666;
          font-weight: 700;
          line-height: 30px;
        }
      }
      .shop-box {
        padding: 15px 0;
      }
      .total {
        font-weight: 700;
      }
      .num-box {
        width: 80px;
        height: 20px;
        margin-left: 10px;
        border: 1px solid #cbcbcb;
        line-height: 18px;
        text-align: center;
        input {
          width: 44px;
          height: 18px;
          border: 1px solid #cbcbcb;
          border-width: 0 1px;
          outline: none;
          text-align: center;
        }
        .but-minus {
          width: 17px;
          height: 18px;
          border: 0;
        }
        .but-add {
          width: 17px;
          height: 18px;
          border: 0;
        }
      }
    }
  }
  .settle-acount-entrance {
    height: 52px;
    & > .fl {
      width: 900px;
      height: 100%;
      padding: 0 11px;
      border: 1px solid #999;
      border-right: 0;
      line-height: 50px;
      .checkbox-box {
        display: inline-block;
        margin-right: 5px;
      }
      .total-price {
        font-size: 16px;
        color: #c81723;
      }
    }
    .but-settle-acount {
      width: 100px;
      height: 100%;
      background-color: #c81623;
      font-size: 18px;
      font-weight: 700;
      line-height: 52px;
      text-align: center;
      a {
        display: block;
        width: 100%;
        height: 100%;
        color: #fff;
      }
    }
  }
  .tip {
    width: 600px;
    height: 300px;
    margin: auto;
    padding: 100px;
    h2 {
      font-size: 30px;
      color: #c81623;
      text-align: center;
      line-height: 63px;
    }
    a {
      float: right;
      font-size: 18px;
      color: #c81623;
      line-height: 63px;
    }
  }
}
</style>