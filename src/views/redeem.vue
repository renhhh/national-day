<template>
  <div class="redeem">
    <div class="title">{{detail.luckyLevel}}</div>
    <div class="title">{{detail.luckyDescribe}}</div>
    <div class="content">
      <div>Получите Свой Приз!</div>
      <div class="second-line">
        <span class="one font-color">Код приза</span>
        <span class="two" id="copyValERC20">{{detail.luckyCode}}</span>
        <span class="copy-btn copyBtn" data-clipboard-target="#copyValERC20" @click="copy">Нажмите Копировать</span>
      </div>
      <div class="qrcode">
        <img class="qrcode-img" src="../assets/images/qrcode.jpg" alt="">
      </div>
      <div class="time font-color">Период предоставления кодов для получения выигрыша</div>
      <div>2021/5/17 - 2021/6/15</div>
      <div class="time font-color">Внимание! </div>
      <div>Чтобы получить приз, необходимо предоставить код Вашего приза</div>
      <div class="confirm-btn">
        <span @click="toastInfo"></span>
      </div>
    </div>
  </div>
</template>
<script>
import ClipboardJS from 'clipboard'
import { Toast } from 'vant';
export default {
  name: 'Redeem',
  data() {
    return {
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
<style lang="scss">
.redeem {
  box-sizing: border-box;
  padding-top: 70px;
  height: 100%;
  background: url('../assets/images/redeem-bg.png') no-repeat center center;
  background-size: 100% 100%;
  .title {
    text-align: center;
    font-size: 18px;
    margin-bottom: 12px;
    color: red;
    font-weight: bold;
  }
  .content {
    box-sizing: border-box;
    padding: 48px 43px 0;
    color: #000;
    .second-line {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .copy-btn {
        box-sizing: border-box;
        text-align: center;
        width: 100px;
        padding: 4px 8px;
        background: cadetblue;
        border-radius: 20px;
        font-size: 12px;
        color: cornsilk;
      }
    }

    .qrcode {
      height: 125px;
      // border: 1px solid #000;
      .qrcode-img {
        height: 125px;
        margin-left: 80px;
      }
    }

    .time {
      margin: 20px 0 10px;
    }
    .font-color {
      color: #ccc;
    }
    .confirm-btn {
      margin-top: 50px;
      text-align: center;
      > span {
        display: inline-block;
        width: 300px;
        height: 60px;
        background: url('../assets/images/confirm-btn.png') no-repeat center
          center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>