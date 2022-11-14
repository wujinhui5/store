<template>
  <dl class="main-bulletin">
    <dt>品优快报<a href="#" class="more">暂时没有更多</a></dt>
    <dd>
      <router-link to="/shop?shopId=0008"
        ><b>特惠 </b>米家小米出品 185L双门冰箱</router-link
      >
    </dd>
    <dd>
      <router-link to="/shop?shopId=0005"
        ><b>特惠 </b>苹果14手机壳【送钢化膜】</router-link
      >
    </dd>
    <dd>
      <router-link to="/shop?shopId=0008"
        ><b>特惠 </b>VAIO高性能轻薄笔记本电脑</router-link
      >
    </dd>
    <dd>
      <router-link to="/shop?shopId=4"
        ><b>特惠 </b>Apple14 (A2884) 128GB</router-link
      >
    </dd>
    <dd>
      <router-link to="/shop?shopId=0002"
        ><b>特惠 </b>海尔滚筒洗衣机全自动</router-link
      >
    </dd>
  </dl>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.main-bulletin {
  height: 165px;
  background-color: #fff;
  margin-top: 3.5px;
  border-radius: 4px;
  box-shadow: 2px 2px 5px #4e4e4e;
}

a {
  color: #333;
  &:hover {
    color: #c81623;
  }
}

dt,
dd {
  padding: 0 13px;
}

dt {
  height: 33px;
  border-bottom: 1px dashed #e4e4e4;
  color: #666;
  line-height: 33px;
}

dt .more {
  float: right;
}

dt .more::after {
  content: "\e920";
  font-family: "icomoon";
}

dd a {
  height: 26px;
  line-height: 26px;
}
</style>