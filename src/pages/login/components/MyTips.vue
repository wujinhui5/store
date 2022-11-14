<template>
  <div class="my-tips fl">
    <table>
      <tr>
        <td>手机号</td>
        <td>密码</td>
        <td>验证码</td>
      </tr>
      <tr>
        <td>13512345678</td>
        <td rowspan="4">12345678a!</td>
        <td rowspan="4">123456</td>
      </tr>
      <tr>
        <td>13012345678</td>
      </tr>
      <tr>
        <td>13912345678</td>
      </tr>
      <tr>
        <td>13812345678</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.my-tips {
  width: 600px;
  height: 400px;
  margin: 100px 0 0 100px;
  padding: 80px 20px 0;
  background-color: #fff;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  table {
    border-collapse: collapse;
    tr {
      line-height: 30px;
      td {
        height: 40px;
        border: 1px solid #999999;
        &:nth-child(1) {
          width: 200px;
        }
        &:nth-child(2) {
          width: 200px;
        }
        &:nth-child(3) {
          width: 159px;
        }
      }
    }
  }
}
</style>