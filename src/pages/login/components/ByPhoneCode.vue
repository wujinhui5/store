<template>
  <table class="by-phone-code">
    <tr>
      <td>手机号：</td>
      <td class="container">
        <input type="text" v-model="form.phone" @blur="verifyPhone" />
      </td>
    </tr>
    <div class="false">{{ errorMes.phone }}</div>
    <tr>
      <td>验证码：</td>
      <td>
        <input class="input-code" v-model="form.code" @focus="verifyCode" />
        <input
          type="button"
          class="send-code"
          :style="buttonStyle"
          :disabled="sendCodeAbout.isDisabled"
          @click="sendMail"
          :value="sendCodeAbout.tip"
        />
      </td>
    </tr>
    <div class="false">{{ errorMes.code }}</div>
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
      code: "",
    });
    let errorMes = reactive({
      phone: "",
      code: "",
    });
    let sendCodeAbout = reactive({
      isDisabled: false,
      tip: "发送验证码",
    });

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
        form.phone != ""
      );
    }

    // 验证验证码
    let isSendMail = false;
    function verifyCode() {
      errorMes.code = verify(
        form.code,
        0,
        ["验证码不能为空", ""],
        form.code != ""
      );
      errorMes.code = verify(
        form.code,
        0,
        ["请先发送手机验证码", errorMes.code],
        isSendMail
      );
    }

    // 发送手机验证码
    let buttonStyle = reactive({});
    let store = useStore();
    function sendMail() {
      if (errorMes.phone || !form.phone) {
        verifyPhone();
        return;
      }
      // 这里发送请求,略

      sendCodeAbout.isDisabled = true;
      buttonStyle.cursor = "not-allowed";
      buttonStyle.background = "#c95960";
      let i = 61;
      let timer = setInterval(() => {
        i--;
        sendCodeAbout.tip = ["剩余", i, "秒"].join("");
        if (!i) {
          sendCodeAbout.tip = "发送验证码";
          sendCodeAbout.isDisabled = false;
          buttonStyle.cursor = "";
          buttonStyle.background = "";
          clearInterval(timer);
          return;
        }
      }, 1000);
      ElMessage.success("验证码为：123456");
      isSendMail = true;
    }

    //登录
    function login() {
      verifyPhone();
      verifyCode();
      if (errorMes.phone || errorMes.code) return;
      let data = JSON.stringify(form);
      store
        .dispatch("user/loginByCode", data)
        .then((res) => {
          router.push("/");
          ElMessage.success(res);
        })
        .catch((err) => {
          if (err.status === 998) {
            errorMes.phone = err.msg;
          } else {
            errorMes.code = err.msg;
          }
        });
    }

    return {
      form,
      errorMes,
      sendCodeAbout,
      buttonStyle,
      verifyPhone,
      verifyCode,
      sendMail,
      login,
    };
  },
};
</script>


<style src="@/assets/less/loginForm.less" lang="less" scoped></style>

<style scoped>
.input-code {
  width: 168px !important;
  height: 36px !important;
  border: 1px solid #999999 !important;
  border-right: 0 !important;
  outline: none !important;
  vertical-align: bottom !important;
}

.send-code {
  width: 80px !important;
  height: 36px !important;
  border: 0 !important;
  color: #fff;
  background-color: #c81623;
  text-align: center;
  line-height: 34px;
  cursor: pointer;
}
</style>