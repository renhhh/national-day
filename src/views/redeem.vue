<template>
  <div class="redeem">
    <div class="header"></div>
    <div class="content">
      <div class="title">兑换码</div>
      <div class="code">{{detail.luckyCode}}</div>
      <div class="bg-qcord"></div>
      <div class="font-style">如何兑奖</div>
      <div class="font-style mb-20">扫码添加企业微信 进入企业微信凭兑换码领取奖品</div>
      <div class="font-style">活动时间</div>
      <div class="font-style">2021年10月1日 一 2021年10月7日</div>
    </div>
  </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import { Toast } from 'vant'
export default {
  name: 'Redeem',
  data() {
    return {
      code: '',
      detail: {},
    }
  },
  created() {
    const detail = this.$route.query.detail
    console.log('[ detail ] >', JSON.parse(detail))
    this.detail = JSON.parse(detail)
  },
  methods: {
    copy() {
      // 创建一个新的ClipboardJS('.copyBtn'),()内为按钮的class
      var copyBtn = new ClipboardJS('.copyBtn')
      copyBtn.on('success', (e) => {
        Toast.success('копировать')
        console.log(e)
        // this.$message({
        //   message: '已成功复制'
        //   type: 'error'
        // });
        // copyBtn.destroy();    // 释放内存
      })
    },
    toastInfo() {
      Toast.success(' копировать номер приза, обратите внимание на facebook ')
    },
  },
}
</script>

<style lang="scss" scoped>
.redeem {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  color: #26654c;
  .header {
    height: 260px;
    background: url('../assets/images/login.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .content {
    position: absolute;
    box-sizing: border-box;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 500px;
    border: 2px solid #016648;
    border-radius: 12px;
    background: #fff;
    padding: 30px 20px;
    .title {
      color: #5f5f5f;
      font-weight: bold;
    }
    .code {
      margin: 18px 0 30px 0;
      height: 40px;
      line-height: 40px;
      padding-left: 10px;
      color:#000;
      border: 1px solid #e4e4e4;
      border-radius: 12px;
    }
    .bg-qcord {
      width: 200px;
      height: 200px;
      background: url('../assets/images/detail/qrcode.png') no-repeat center
        center;
      background-size: 100% 100%;

      margin: 0 auto 30px;
    }
    .font-style {
      font-size: 14px;
      font-weight: bold;
      line-height: 18px;
    }
    .mb-20 {
      margin-bottom: 20px;
    }
  }
}
</style>
