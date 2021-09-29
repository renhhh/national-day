<template>
  <div class="card-box">
    <div class="header"></div>
    <div class="center-box">
      <div class="center-item">
        <div>
          集齐卡片
          <span class="black-font">“承诺•让平凡见证伟大”</span> 10张卡片
        </div>
        <div>即可参加大转盘活动抽取大礼包</div>
        <div>邀请好友助力 每邀请一位好友可获得3张卡片</div>
      </div>
    </div>
    <div class="card-area">
      <img
        v-for="(item, index) of imgData"
        :key="index"
        :src="item.imgUrl"
        :alt="item.imgUrl"
      />
    </div>

    <div class="btn-group">
      <span @click="jumpPoster">请TA助力</span>
      <span @click="jumpHome">即刻抽奖</span>
    </div>
  </div>
</template>

<script>
import axios from '../assets/js/axios'
import { Toast } from 'vant'

export default {
  name: 'Card',
  data() {
    return {
      userInfo: JSON.parse(sessionStorage.getItem('userInfo')),
      emptyUrl: {
        imgUrl: require('../assets/images/card/empty.png'),
      },
      imgData: [],
      imgOriginData: [
        {
          imgUrl: require('../assets/images/card/cheng.png'),
        },
        {
          imgUrl: require('../assets/images/card/nuo.png'),
        },
        {
          imgUrl: require('../assets/images/card/circle.png'),
        },
        {
          imgUrl: require('../assets/images/card/rang.png'),
        },
        {
          imgUrl: require('../assets/images/card/ping.png'),
        },
        {
          imgUrl: require('../assets/images/card/fan.png'),
        },
        {
          imgUrl: require('../assets/images/card/jian.png'),
        },
        {
          imgUrl: require('../assets/images/card/zheng.png'),
        },
        {
          imgUrl: require('../assets/images/card/wei.png'),
        },
        {
          imgUrl: require('../assets/images/card/da.png'),
        },
      ],
    }
  },
  created() {
    console.log(this.imgData)
    let cardNum = this.userInfo.cardNumb
    if (cardNum >= 10) {
      this.imgData = JSON.parse(JSON.stringify(this.imgOriginData))
    } else {
      this.imgData = JSON.parse(JSON.stringify(this.imgOriginData)).slice(
        0,
        cardNum
      )
      let len = 10 - cardNum
      for (let i = 0; i < len; i++) {
        this.imgData.push(this.emptyUrl)
      }
    }
  },
  methods: {
    jumpPoster() {
      this.$router.push('/poster')
    },
    jumpHome() {
      let num = this.userInfo.hasNum
      if (num == 0) {
        Toast.fail('非常抱歉，您的卡片数量未达到抽奖条件！')
        return
      }
      this.$router.push('/home')
    },
  },
}
</script>
<style lang="scss">
.card-box {
  .van-dialog {
    background: transparent;
  }
}
</style>
<style lang="scss" scoped>
.card-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  .header {
    height: 260px;
    background: url('../assets/images/card-header.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .center-box {
    width: 88%;
    height: 100px;
    margin: 30px auto;
    border: 2px solid #068b64;
    border-radius: 20px;
    .center-item {
      box-sizing: border-box;
      width: 96%;
      height: 90%;
      padding: 12px 20px;
      font-size: 15px;
      line-height: 22px;
      margin: 0 auto;
      background: #098d66;
      border-radius: 20px;
    }
  }
  .black-font {
    color: #000;
    font-weight: bold;
  }
  .card-area {
    box-sizing: border-box;
    height: 200px;
    background: url('../assets/images/card-border.png') no-repeat center center;
    background-size: 100% 100%;
    padding: 32px 40px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    > img {
      box-sizing: border-box;
      width: 19%;
      height: 68px;
      padding: 6px;
    }
  }
  .btn-group {
    margin: 40px 0 20px;
    text-align: center;
    span {
      box-sizing: border-box;
      margin: 0 12px;
      padding: 10px 20px;
      border-radius: 12px;
      background: #098d66;
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 2px;
      &:active {
        background: #14ca94;
      }
    }
  }
}
</style>
