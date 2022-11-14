<template>
  <div class="login-up">
    <!-- 头部模块 -->
    <div class="w header">
      <AppLogo />
      <div class="fr">
        已有账号？去<router-link class="styleRed" to="/login">登陆</router-link>
      </div>
    </div>

    <!-- 主体注册模块 -->
    <div class="main">
      <LoginUpForm />
    </div>

    <!-- 尾部 -->
    <AppAbout />
  </div>
</template>

<script>
import AppLogo from "../../components/AppLogo";
import AppAbout from "../../components/AppAbout";
import LoginUpForm from "./components/LoginUpForm";

export default {
  components: { LoginUpForm, AppLogo, AppAbout },
  setup() {
    document.title = "品优购商城-会员注册";
  },
};
</script>

<style lang="less" scoped>
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
}
</style>