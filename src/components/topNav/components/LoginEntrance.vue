<template>
  <div class="fl">
    <span>品优购欢迎您!</span>
    &nbsp;&nbsp;
    <span class="container" v-if="!name">
      <router-link to="/login">请登录</router-link>
      &nbsp;&nbsp;
      <router-link class="style_red" to="/loginUp">免费注册</router-link>
    </span>
    <span class="name" v-if="name">{{ name }}</span>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  setup() {
    let store = useStore();
    let name = store.state.user.name;

    return {
      name,
    };
  },
};
</script>

<style scoped>
.style_red {
  color: #c81623;
}

.name::after {
  content: "\e91e";
  font-family: "icomoon";
}
</style>