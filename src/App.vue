<template>
  <router-view v-if="isLoad"></router-view>
</template>

<script>
import { reactive, toRefs, nextTick, provide } from "vue";
export default {
  name: "App",
  setup() {
    let data = reactive({
      isLoad: true,
    });

    function reload() {
      data.isLoad = false;
      nextTick(() => {
        data.isLoad = true;
      });
    }

    provide("reload", reload);

    return {
      ...toRefs(data),
    };
  },
};
</script>

<style>
</style>