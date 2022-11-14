<template>
  <div class="store-login">
    <!-- 头部模块 -->
    <div class="w header">
      <AppLogo />
      <div class="fr">
        没有账号？去<router-link class="styleRed" to="/loginUp"
          >注册</router-link
        >
      </div>
    </div>

    <!-- 主体注册模块 -->
    <div class="main">
      <MyTips />
      <div class="form-container">
        <div class="router-link-container" ref="routerLink">
          <router-link class="no-active" to="/login/bycode"
            >短信登录</router-link
          >
          <router-link class="no-active" to="/login/bypass"
            >密码登录</router-link
          >
        </div>
        <form>
          <router-view></router-view>
        </form>
      </div>
    </div>

    <!-- 尾部 -->
    <AppAbout />
  </div>
</template>

<script>
import AppLogo from "../../components/AppLogo";
import AppAbout from "../../components/AppAbout";
import MyTips from "./components/MyTips";

export default {
  components: { AppLogo, AppAbout, MyTips },
  setup() {
    document.title = "品优购商城-登录";
  },
};
</script>

<style lang="less" scoped>
.store-login {
  .header {
    height: 85px;
    border-bottom: 2px solid #b1191a;
    .fr {
      height: 70px;
      font-size: 16px;
      color: #999999;
      line-height: 70px;
      .styleRed {
        color: #c81623;
      }
    }
  }
  .main {
    background: #c81623;
    height: 600px;
    min-width: 1200px;
    margin-top: 20px;
    overflow: hidden;
    .form-container {
      width: 390px;
      height: 400px;
      margin: 100px 0 0 800px;
      padding: 20px;
      border-radius: 5px;
      background: #fff;
      .router-link-container {
        .no-active {
          display: inline-block;
          width: 100px;
          height: 30px;
          margin-right: 5px;
          border: 0;
          border-radius: 4px;
          font-size: 16px;
          color: #999999;
          text-align: center;
          line-height: 30px;
        }
        .router-link-active {
          background: #c81623;
          color: #fff;
        }
      }
    }
  }
}
</style>