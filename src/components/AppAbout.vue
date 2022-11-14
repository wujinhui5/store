<template>
  <div class="w app-about">
    <ul class="about">
      <li><a href="#">关于我们</a></li>
      <li></li>
      <li><a href="#">联系我们</a></li>
      <li></li>
      <li><a href="#">联系客服</a></li>
      <li></li>
      <li><a href="#">商家入驻</a></li>
      <li></li>
      <li><a href="#">营销中心</a></li>
      <li></li>
      <li><a href="#">手机品优购</a></li>
      <li></li>
      <li><a href="#">友情链接</a></li>
      <li></li>
      <li><a href="#">销售联盟</a></li>
      <li></li>
      <li><a href="#">品优购社区</a></li>
      <li></li>
      <li><a href="#">品优购公益</a></li>
      <li></li>
      <li><a href="#">English Site</a></li>
      <li></li>
      <li><a href="#">Contact U</a></li>
    </ul>
    <p>
      地址：广东省XX市XX区XXXXXXX 邮编：999999 电话：400-000-0000
      传真：010-00000000 邮箱: 961801324@qq.com
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="less">
.app-about {
  padding: 10px;
  color: #666;
  font-size: 12px;
  text-align: center;
  .about {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    li {
      float: left;
      height: 100%;

      &:nth-child(2n) {
        width: 0;
        height: 12px;
        margin-top: 10px;
        border-right: 1px solid #666;
      }
    }

    a {
      display: block;
      height: 100%;
      padding: 0 15px;
      color: #666;

      &:hover {
        color: #da5555;
      }
    }
  }
  p {
    height: 22px;
    line-height: 22px;
  }
}
</style>