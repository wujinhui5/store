<template>
  <div class="footer">
    <AppAdvantage />
    <AppServe />
    <AppAbout />
  </div>
</template>

<script>
import AppAbout from "@/components/AppAbout";
import AppAdvantage from "./components/AppAdvantage";
import AppServe from "./components/AppServe";

export default {
  components: { AppAbout,AppAdvantage,AppServe },
};
</script>

<style scoped>
.footer {
  min-width:1200px;
  background-color: #f5f5f5;
  height: 417px;
}
</style>