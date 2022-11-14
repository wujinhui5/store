<template>
  <div class="aside-nav fl">
    <dl>
      <dt>订单中心</dt>
      <dd><router-link to="/order/all">全部订单</router-link></dd>
      <dd><router-link to="/order/uncompleted">待收货</router-link></dd>
      <dd><router-link to="/order/refunding">退款中</router-link></dd>
      <dd><router-link to="/order/completed">已完成</router-link></dd>
    </dl>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.aside-nav {
  width: 109px;
  margin-right: 11px;
  padding-left: 11px;
  dt {
    height: 28px;
    color: #333333;
    font-weight: 700;
    line-height: 28px;
  }
  dd {
    height: 24px;
    line-height: 24px;
    a {
      color: #666;
    }
    .router-link-active {
      color: #c81623;
    }
  }
}
</style>