<template>
  <div class="store-nav">
    <div class="w">
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">全部商品</a></li>
      </ul>
      <div class="search">
        <input type="text" />
        <button>搜店内</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.store-nav {
  background: #005aaa;
  min-width: 1200px;
  height: 40px;
  padding: 7px 0;
  font-size: 14px;
  line-height: 26px;
  ul {
    height: 100%;
    li {
      float: left;
      height: 100%;
      a {
        display: block;
        height: 26px;
        padding: 0 14px;
        border-radius: 20px;
        color: #fff;
        &:hover {
          background: #333;
        }
      }
    }
  }

  .search {
    float: right;
    width: 200px;
    height: 26px;
    input {
      width: 150px;
      height: 100%;
      padding: 0 5px;
      border: 1px solid #e1e1e1;
      border-right: 0;
      border-radius: 20px 0 0 20px;
      outline: none;
    }
    button {
      width: 50px;
      height: 100%;
      border: 0;
      border-radius: 0 20px 20px 0;
      background: #333;
      color: #fff;
      vertical-align: bottom;
    }
  }
}
</style>