<template>
  <div class="w app-advantage" ref="advantage">
    <ul>
      <li>
        <div class="advantage-pic"></div>
        <div class="advantage-discribe">
          <h3>正品保障</h3>
          <p>正品保障，提供发票</p>
        </div>
      </li>
      <li>
        <div class="advantage-pic"></div>
        <div class="advantage-discribe">
          <h3>极速物流</h3>
          <p>急速物流，急速送达</p>
        </div>
      </li>
      <li>
        <div class="advantage-pic"></div>
        <div class="advantage-discribe">
          <h3>无忧售后</h3>
          <p>7天无理由退换货</p>
        </div>
      </li>
      <li>
        <div class="advantage-pic"></div>
        <div class="advantage-discribe">
          <h3>特色服务</h3>
          <p>私人定制家电套餐</p>
        </div>
      </li>
      <li>
        <div class="advantage-pic"></div>
        <div class="advantage-discribe">
          <h3>帮助中心</h3>
          <p>您的购物指南</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    var modAdvantage = this.$refs.advantage;
    var modAdvantagePic = modAdvantage.querySelectorAll(".advantage-pic");
    let tempX;
    let tempY;
    for (var i = 0; i < modAdvantagePic.length; i++) {
      tempX = -253 + "px";
      tempY = -3 * (i + 1) - 49 * i + "px";
      modAdvantagePic[i].style.backgroundPosition = tempX + " " + tempY;
    }
  },
};
</script>

<style scoped>
.app-advantage {
  height: 109px;
  padding-top: 30px;
  border-bottom: 1px solid #ededed;
}

li {
  float: left;
  width: 240px;
}

.advantage-pic {
  float: left;
  width: 49px;
  height: 49px;
  margin: 0 5px 0 37px;
  border-radius: 24px;
  background: url(@/../public/images/icons.png);
}

.advantage-discribe h3 {
  height: 28px;
  color: #333;
  font-size: 14px;
  line-height: 28px;
}

.advantage-discribe p {
  height: 18px;
  color: #666;
  font-size: 12px;
  line-height: 18px;
}
</style>