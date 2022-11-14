<template>
  <table class="passwordTab">
    <tr>
      <td>手机号：</td>
      <td>
        <input
          type="text"
          class="phoneNumber"
          v-model="form.phone"
          @blur="verifyPhone"
        />
      </td>
    </tr>
    <div class="false">{{ errorMes.phone }}</div>
    <tr>
      <td>登录密码：</td>
      <td>
        <input
          type="password"
          class="password"
          v-model="form.password"
          autocomplete="off"
          @blur="verifyPassword"
        />
      </td>
    </tr>
    <div class="false">{{ errorMes.password }}</div>
    <input type="button" class="loginButton" @click="login" value="登录" />
  </table>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import router from "@/router";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";
import { verify } from "@/modules/formverify";

export default {
  setup() {
    let form = reactive({
      phone: "",
      password: "",
    });
    let errorMes = reactive({
      phone: "",
      password: "",
    });
    let store = useStore();

    // 验证手机号
    function verifyPhone() {
      errorMes.phone = verify(
        form.phone,
        /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/,
        ["手机号格式错误", ""]
      );

      errorMes.phone = verify(
        form.phone,
        0,
        ["手机号不能为空", errorMes.phone],
        form.phone !== ""
      );
    }

    // 验证密码
    function verifyPassword() {
      errorMes.password = verify(
        form.password,
        0,
        ["密码不能为空", ""],
        form.password !== ""
      );
    }

    //登录
    function login() {
      verifyPhone();
      verifyPassword();
      if (errorMes.phone || errorMes.password) return;
      let data = JSON.stringify(form);
      store
        .dispatch("user/loginByPass", data)
        .then((res) => {
          router.push("/");
          ElMessage.success(res);
        })
        .catch((err) => {
          ElMessage.error(err);
        });
    }

    return {
      form,
      errorMes,
      verifyPhone,
      verifyPassword,
      login,
    };
  },
};
</script>

<style src="@/assets/less/loginForm.less" lang="less" scoped></style>