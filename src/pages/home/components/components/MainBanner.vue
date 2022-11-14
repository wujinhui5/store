<template>
  <div class="user-base-info">
    <div class="logined" v-if="$store.state.user.name">
      <div class="fl head-portrait">
        <img :src="this.$store.state.user.headPortrait" alt="头像" />
      </div>
      <div class="fr">
        <div class="user-name">
          {{ $store.state.user.name }}
        </div>
        <button @click="logout">退出</button>
      </div>
    </div>
    <div class="unlogined" v-if="!$store.state.user.name">
      <div class="title">未登录</div>
      <router-link to="/login">请登录</router-link>
      &nbsp;&nbsp;
      <router-link class="style_red" to="/loginUp">免费注册</router-link>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import router from "@/router";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";

export default {
  setup() {
    // 退出登录
    let store = useStore();
    function logout() {
      store.dispatch("user/logout").then((res) => {
        ElMessage.success(res);
        router.push("/login");
      });
    }

    return {
      logout,
    };
  },
};
</script>

<style lang="less" scoped>
.user-base-info {
  width: 250px;
  height: 75px;
  margin-top: 10px;
  padding: 12.5px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 2px 2px 5px #4e4e4e;

  .logined {
    .head-portrait {
      width: 50px;
      height: 50px;
      border-radius: 30px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .fr {
      width: 162.5px;
      margin-left: 12.5px;
      .user-name {
        height: 32px;
        color: #666;
        font-size: 12px;
        line-height: 16px;
        overflow: hidden;
      }
      button {
        width: 50px;
        height: 20px;
        line-height: 20px;
        border: 0;
        border-radius: 4px;
        background: #c81623;
        color: #fff;
      }
    }
  }

  .unlogined {
    text-align: center;
    .title {
      margin-bottom: 5px;
    }
    a {
      display: inline-block;
      width: 80px;
      height: 20px;
      border-radius: 4px;
      color: #fff;
      background: #c81623;
    }
  }
}
</style>