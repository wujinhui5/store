<template>
  <div class="w app-service">
    <dl>
      <dt>购物指南</dt>
      <dd>购物流程</dd>
      <dd>会员介绍</dd>
      <dd>生活旅行/团购</dd>
      <dd>常见问题</dd>
      <dd>大家电</dd>
      <dd>联系客服</dd>
    </dl>
    <dl>
      <dt>配送方式</dt>
      <dd>上门自提</dd>
      <dd>211限时达</dd>
      <dd>配送服务查询</dd>
      <dd>配送费收取标准</dd>
      <dd>海外配送</dd>
    </dl>
    <dl>
      <dt>支付方式</dt>
      <dd>货到付款</dd>
      <dd>在线支付</dd>
      <dd>分期付款</dd>
      <dd>邮局汇款</dd>
      <dd>公司转账</dd>
    </dl>
    <dl>
      <dt>售后服务</dt>
      <dd>售后政策</dd>
      <dd>价格保护</dd>
      <dd>退款说明</dd>
      <dd>返修/退换货</dd>
      <dd>取消订单</dd>
    </dl>
    <dl>
      <dt>特色服务</dt>
      <dd>夺宝岛</dd>
      <dd>DIY装机</dd>
      <dd>延保服务</dd>
      <dd>品优购E卡</dd>
      <dd>品优购通信</dd>
    </dl>
    <dl class="help">
      <dt>帮助中心</dt>
      <dd>
        <img src="@/../public/images/app.png" alt="扫码下载客户端" />
      </dd>
      <dd>品优购客户端</dd>
    </dl>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.app-service {
  height: 188px;
  border-bottom: 1px solid #ededed;
}

dl {
  float: left;
  width: 200px;
  height: 100%;
  padding: 20px 0 0 50px;
}

dt {
  margin-bottom: 8px;
  font-size: 16px;
  color: #333;
}

dd {
  height: 20px;
  font-size: 12px;
  color: #666;
  line-height: 20px;
}

.help dl {
  padding-left: 30px;
}

.help dt {
  margin-left: 14px;
}

.help dd:nth-child(2) {
  width: 99px;
  height: 95px;
}

.help dd:nth-child(3) {
  margin: 6px 0 0 10px;
}
</style>