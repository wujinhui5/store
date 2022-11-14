<template>
  <form class="login-up-form">
    <table>
      <tr>
        <td>手机号：</td>
        <td>
          <input
            type="text"
            v-model="form.phone"
            @blur="verifyPhone"
            class="phoneNumber"
          />
        </td>
      </tr>
      <tr>
        <td colspan="3" :class="cName.phone">
          {{ errorMes.phone }}
        </td>
      </tr>
      <tr>
        <td>验证码：</td>
        <td>
          <input
            type="text"
            v-model="form.code"
            autocomplete="off"
            @focus="verifyCode"
            @blur="verifyCode"
            id="phoneCode"
          />
          <input
            type="button"
            id="sendPhoneCode"
            :style="buttonStyle"
            @click="sendCode"
            :disabled="sendCodeAbout.isDisabled"
            :value="sendCodeAbout.tip"
          />
        </td>
      </tr>
      <tr>
        <td colspan="3" :class="cName.code">
          {{ errorMes.code }}
        </td>
      </tr>
      <tr>
        <td>登录密码：</td>
        <td>
          <input
            type="password"
            v-model="form.password"
            @blur="verifyPassword"
            autocomplete="new-password"
            class="password"
          />
        </td>
      </tr>
      <tr>
        <td colspan="3" :class="'normal ' + cName.password">
          {{ errorMes.password }}
        </td>
      </tr>
      <tr>
        <td>确认密码：</td>
        <td>
          <input
            type="password"
            v-model="form.confirmPassword"
            @blur="verifyConfirmPassword"
            autocomplete="off"
            class="confirmPassword"
          />
        </td>
      </tr>
      <tr>
        <td colspan="3" :class="cName.confirmPassword">
          {{ errorMes.confirmPassword }}
        </td>
      </tr>
      <tr>
        <td></td>
        <td>
          <input type="checkbox" v-model="form.agree" id="agree" />同意<a
            href="#"
            >《品优购用户协议》</a
          >并注册
        </td>
      </tr>
      <tr>
        <td colspan="3" class="false">
          {{ errorMes.agree }}
        </td>
      </tr>
      <tr>
        <td colspan="3">
          <input type="button" class="login-up" @click="loginUp" value="注册" />
        </td>
      </tr>
    </table>
  </form>
</template>

<script>
import { reactive } from "vue";
import { verify } from "@/modules/formverify";
import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";

export default {
  setup() {
    let form = reactive({
      phone: "",
      code: "",
      password: "",
      confirmPassword: "",
      agree: false,
    });
    let errorMes = reactive({
      phone: "",
      code: "",
      password: "",
      confirmPassword: "",
      agree: "",
    });
    let cName = reactive({
      phone: "",
      code: "",
      password: "",
      confirmPassword: "",
      agree: "",
    });
    // let isSendMail=false

    // 验证手机号
    function verifyPhone() {
      [errorMes.phone, cName.phone] = verify(
        form.phone,
        /^((1[3,5,8][0-9])|(14[5,7])|(17[0,5,6,7,8])|(19[7]))\d{8}$/,
        [
          ["手机号格式错误", "false"],
          ["", "true"],
        ]
      );

      [errorMes.phone, cName.phone] = verify(
        form.phone,
        0,
        [
          ["手机号不能为空", "false"],
          [errorMes.phone, cName.phone],
        ],
        form.phone != ""
      );
    }

    let sendCodeAbout = reactive({
      isDisabled: false,
      tip: "发送验证码",
    });
    let isSendMail = false;
    let buttonStyle = reactive({});

    // 发送验证码
    function sendCode() {
      if (errorMes.phone || !form.phone) {
        verifyPhone();
        return;
      }
      sendCodeAbout.isDisabled = true;
      buttonStyle.cursor = "not-allowed";
      buttonStyle.background = "#c95960";
      let i = 61;
      // 这里发送请求，发送验证码，略
      let timer = setInterval(() => {
        i--;
        sendCodeAbout.tip = ["剩余", i, "秒"].join("");
        if (!i) {
          sendCodeAbout.isDisabled = false;
          sendCodeAbout.tip = "发送验证码";
          buttonStyle.cursor = "";
          buttonStyle.background = "";
          clearInterval(timer);
          return;
        }
      }, 1000);
      ElMessage.success("验证码：123456");
      isSendMail = true;
    }

    // 验证验证码
    function verifyCode() {
      [errorMes.code, cName.code] = verify(
        form.code,
        0,
        [
          ["验证码不能为空", "false"],
          ["", "true"],
        ],
        form.code != ""
      );
      [errorMes.code, cName.code] = verify(
        form.code,
        0,
        [
          ["请先发送手机验证码", "false"],
          [errorMes.code, cName.code],
        ],
        isSendMail
      );
    }

    // 验证密码
    function verifyPassword() {
      [errorMes.password, cName.password] = verify(
        form.password,
        /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{10,20}$/,
        [
          ["请输入长度为10-20位包含数字、字母、特殊字符的密码", "false"],
          ["密码格式正确", "true"],
        ]
      );
      [errorMes.password, cName.password] = verify(
        form.password,
        0,
        [
          ["密码不能为空", "false"],
          [errorMes.password, cName.password],
        ],
        form.password != ""
      );
    }

    // 验证两次密码是否一致
    function verifyConfirmPassword() {
      [errorMes.confirmPassword, cName.confirmPassword] = verify(
        form.confirmPassword,
        0,
        [
          ["两次密码输入不一致", "false"],
          ["密码一致", "true"],
        ],
        form.password === form.confirmPassword
      );

      [errorMes.confirmPassword, cName.confirmPassword] = verify(
        form.confirmPassword,
        0,
        [
          ["", "false"],
          [errorMes.confirmPassword, cName.confirmPassword],
        ],
        form.confirmPassword
      );
    }

    function verifyAgree() {
      if (!form.agree) {
        errorMes.agree = "请阅读协议并勾选选项框";
        cName.agree = "false";
      } else {
        errorMes.agree = "";
        cName.agree = "true";
      }
    }

    function loginUp() {
      verifyPhone();
      verifyCode();
      verifyPassword();
      verifyConfirmPassword();
      verifyAgree();
      if (
        cName.phone === "true" &&
        cName.code === "true" &&
        cName.password === "true" &&
        cName.confirmPassword === "true" &&
        cName.agree === "true"
      ) {
        ElMessage.success("注册成功，但是相关的mock没写，因此登录不了！")
      }
    }

    return {
      form,
      errorMes,
      cName,
      sendCodeAbout,
      buttonStyle,
      sendCode,
      verifyPhone,
      verifyCode,
      verifyPassword,
      verifyConfirmPassword,
      loginUp,
    };
  },
};
</script>

<style lang="less" scoped>
.login-up-form {
  width: 600px;
  height: 400px;
  margin: 100px auto;
  padding: 20px;
  border-radius: 5px;
  background: #fff;
  font-size: 14px;
  color: #4c4c4c;
  table {
    margin: 0 auto;
    tr {
      &:nth-child(2n + 1) {
        height: 36px;
        td {
          height: 36px;
          &:nth-child(1) {
            width: 90px;
            line-height: 36px;
            text-align: right;
          }
          &:nth-child(2) {
            width: 250px;
            input {
              width: 100%;
              height: 100%;
              border: 1px solid #999999;
              outline: none;
            }
          }
          #phoneCode {
            width: 168px;
            height: 36px;
            border-right: 0;
            outline: none;
            vertical-align: bottom;
          }
          #sendPhoneCode {
            width: 82px;
            height: 36px;
            border: 0;
            background: #c81623;
            color: #fff;
            text-align: center;
            line-height: 36px;
          }
          #agree {
            width: 15px;
            height: 15px;
          }
        }
      }
      &:nth-child(2n) {
        height: 20px;
        td {
          padding-left: 90px;
          font-size: 12px;
          line-height: 20px;
        }
        .false {
          color: #c81623;
        }
        .true {
          color: rgb(0, 189, 0);
        }
      }
      .login-up {
        width: 250px;
        height: 36px;
        border: 0;
        background: #c81623;
        color: #fff;
            cursor:pointer;
      }
    }
  }
}
</style>