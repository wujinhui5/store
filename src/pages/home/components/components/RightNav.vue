<template>
  <ul class="right-nav" ref="rightNav">
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">话费</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">机票</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">电影票</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">游戏</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">彩票</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">加油卡</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">酒店</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">火车</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">众筹</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">理财</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">礼品卡</div>
      </a>
    </li>
    <li>
      <a href="#">
        <div class="background"></div>
        <div class="discribe">白条</div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  // 精灵图定位
  mounted() {
    var asideNav = this.$refs.rightNav;
    var asideNavBackground = asideNav.querySelectorAll(".background");
    let tempX;
    let tempY;
    for (var i = 0; i < asideNavBackground.length; i++) {
      tempX = -17 - 63 * (i % 4) + "px";
      tempY = -16 - 72 * Math.floor(i / 4) + "px";
      asideNavBackground[i].style.backgroundPosition = tempX + " " + tempY;
    }
  },
};
</script>

<style scoped>
.right-nav {
  background-color: #fff;
  height: 207px;
  margin-top: 3.5px;
  border-radius: 4px;
  box-shadow: 2px 2px 5px #4e4e4e;
}

li {
  float: left;
}

a {
  display: block;
  width: 63px;
  height: 69px;
  padding-top: 13px;
    color: #333;
}
a:hover {
      color: #c81623;
    }

li:nth-child(4n) a {
  width: 61px;
}

li a .background {
  width: 24px;
  height: 24px;
  margin-left: 20px;
  background: url(@/../public/images/icons.png);
}

li a .discribe {
  margin-top: 10px;
  text-align: center;
}
</style>