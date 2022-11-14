<template>
  <div class="wait-for-receiving">
    <template v-if="!(order==false)">
      <table>
      <thead>
        <tr>
          <td>近三个月订单</td>
          <td>订单详情</td>
          <td>收货人</td>
          <td>金额</td>
          <td>状态</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <template v-for="(ite, idx) in order" :key="idx">
          <tr class="order-header">
            <td>{{ ite.time }}</td>
            <td>
              订单号：&nbsp;<span>{{ ite.code }}</span>
            </td>
            <td>{{ ite.storeName }}</td>
          </tr>
          <tr class="order-shop">
            <td></td>
            <td>
              <div class="fl">
                <SmallShopBox
                  :title="ite.title"
                  :imgUrl="ite.imgUrl"
                  :query="{ storeId: ite.storeId, shopId: ite.shopId }"
                />
              </div>
              <div class="fl num">&times;{{ ite.num }}</div>
            </td>
            <td>{{ ite.consignee }}</td>
            <td>&#65509;{{ ite.price }}</td>
            <td>
              <span v-if="ite.type === 'uncompleted'">待收货</span>
              <span v-if="ite.type === 'completed'">已完成</span>
              <span v-if="ite.type === 'refunding'">退款中</span>
            </td>
            <td>
              <a
                v-if="ite.type === 'uncompleted'"
                class="but-notarize"
                href="javascript:;"
                @click="confirmReceipt(ite.shopId)"
                >确认收货</a
              >
              <a
                v-if="ite.type === 'uncompleted'"
                class="but-notarize"
                href="javascript:;"
                @click="cancalOrder(ite.shopId)"
                >取消订单</a
              >
              <a
                v-if="ite.type === 'refunding'"
                class="but-notarize"
                href="javascript:;"
                @click="cancalRefund(ite.shopId)"
                >取消退货</a
              >
            </td>
          </tr>
        </template>
      </tbody>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
    </template>
    <template v-if="order == false">
      <div class="tip">
        <h2 class="title">当前分类下没有订单！</h2>
        <router-link to="/">点击前往购物</router-link>
      </div>
    </template>
  </div>
</template>

<script>
import {
  getOrderApi,
  confirmReceiptApi,
  cancalOrderApi,
  cancalRefundApi,
} from "@/utils/shop";
import { useStore } from "vuex";
import { reactive, toRefs, inject } from "vue";
import SmallShopBox from "@/components/shop/SmallShopBox";
import { ElMessage } from "element-plus";
import "element-plus/es/components/message/style/css";

export default {
  props: ["type"],
  components: { SmallShopBox },
  setup(props) {
    let data = reactive({
      order: [],
    });

    // 获取订单信息
    let store = useStore();
    function getOrder() {
      let reqData = JSON.stringify({
        phone: store.state.user.phone,
        type: props.type,
      });
      getOrderApi(reqData).then((res) => {
        let resData = JSON.parse(res.data);
        if (resData.meta.status === 200) {
          data.order = resData.data;
        }
      });
    }
    getOrder();

    // 确认收货
    let reload = inject("reload");
    function confirmReceipt(shopId) {
      let reqData = JSON.stringify({ shopId, phone: store.state.user.phone });
      confirmReceiptApi(reqData)
        .then((res) => {
          let resData = JSON.parse(res.data);
          if (resData.meta.status === 200) {
            ElMessage.success(resData.meta.msg);
            reload();
          }
        })
        .catch((err) => console.log(err));
    }

    // 取消订单
    function cancalOrder(shopId) {
      let reqData = JSON.stringify({ shopId, phone: store.state.user.phone });
      cancalOrderApi(reqData)
        .then((res) => {
          let resData = JSON.parse(res.data);
          if (resData.meta.status === 200) {
            ElMessage.success(resData.meta.msg);
            reload();
          }
        })
        .catch((err) => console.log(err));
    }

    // 取消退款
    function cancalRefund(shopId) {
      let reqData = JSON.stringify({ shopId, phone: store.state.user.phone });
      cancalRefundApi(reqData)
        .then((res) => {
          let resData = JSON.parse(res.data);
          if (resData.meta.status === 200) {
            ElMessage.success(resData.meta.msg);
            reload();
          }
        })
        .catch((err) => console.log(err));
    }

    return {
      ...toRefs(data),
      confirmReceipt,
      cancalOrder,
      cancalRefund,
    };
  },
};
</script>

<style lang="less" scoped>
.wait-for-receiving {
  background-color: #fff;
  text-align: center;

  table {
    display: block;
    border-spacing: 0;
    thead {
      display: block;
      height: 42px;
      padding: 5px 0;
      border: 1px solid #e9e9e9;
      background: #f3f3f3;
      border-top: 0;
      color: #434343;
      line-height: 31px;
      tr {
        td:nth-child(1) {
          width: 139px;
        }
        td:nth-child(2) {
          width: 450px;
        }
      }
    }
    tr {
      display: block;
      td:nth-child(3) {
        width: 110px;
      }
      td:nth-child(4) {
        width: 120px;
      }
      td:nth-child(5) {
        width: 110px;
      }
      td:nth-child(6) {
        width: 109px;
      }
    }
    tbody {
      display: block;
      color: #aaa;
      .order-header {
        height: 31px;
        margin-top: 10px;
        padding: 0 11px;
        border: 1px solid #e9e9e9;
        border-bottom: 0;
        background: #f3f3f3;
        line-height: 31px;
        text-align: left;
        td {
          display: inline-block;
          margin-right: 20px;
          &:nth-child(2) {
            span {
              color: #333;
            }
          }
          &:nth-child(3) {
            color: #333;
          }
        }
      }
      .order-shop {
        height: 103px;
        border: 1px solid #e9e9e9;
        border-top: 0;
        td {
          display: inline-block;
          height: 102px;
          padding: 10px 0;
          &:nth-child(2) {
            width: 589px;
            padding-left: 10px;
            .num {
              width: 100px;
              margin-left: 89px;
            }
          }
          &:nth-child(3),
          &:nth-child(4),
          &:nth-child(5),
          &:nth-child(6) {
            border-left: 1px solid #e9e9e9;
          }
          .but-notarize {
            display: block;
            margin-bottom: 10px;
            color: #333;
            cursor: pointer;
            &:hover {
              color: #c81623;
            }
          }
        }
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