<template>
  <div class="login-box">
    <div class="header"></div>
    <div class="content">
      <van-field
        v-model="tel"
        type="tel"
        class="telephone"
        placeholder="请输入手机号"
      />

      <div class="login-btn" @click="clickLogin"></div>
    </div>
    <div class="bounary">
      <div class="txt">登录说明</div>
    </div>
    <div class="desc">手机号用于登录且记录您本次活动的排名信息</div>
  </div>
</template>

<script>
import axios from '../assets/js/axios'

export default {
  name: 'Login',
  data() {
    return {
      tel: '',
    }
  },
  created() {},
  mounted() {
    this.getPrizesList()
  },
  methods: {
    handleClick(flag) {
      this.active = flag
      this.show = true
    },
    getPrizesList() {
      const prizes = []
      let data = [
        {
          name: '',
          img: require('../assets/present/1.png'),
          color: '#f8d384',
          flag: 1,
        },
        {
          name: '',
          img: require('../assets/present/3.png'),
          color: '#f9e3bb',
          flag: 3,
        },

        {
          name: '',
          img: require('../assets/present/6.png'),
          color: '#d7d7d7',
          flag: 6,
        },
        {
          name: '',
          img: require('../assets/present/2.png'),
          color: '#f8d384',
          flag: 2,
        },

        {
          name: '',
          img: require('../assets/present/6.png'),
          color: '#d7d7d7',
          flag: 6,
        },

        {
          name: '',
          img: require('../assets/present/4.png'),
          color: '#f9e3bb',
          flag: 4,
        },
        {
          name: '',
          img: require('../assets/present/5.png'),
          color: '#fef43e',
          flag: 5,
        },
        {
          name: '',
          img: require('../assets/present/6.png'),
          color: '#d7d7d7',
          flag: 6,
        },
      ]
      data.forEach((item, index) => {
        prizes.push({
          // name: item.name,
          background: item.color,
          fonts: [{ text: item.name, top: '10%' }],
          imgs: [{ src: item.img, width: '65%', top: '5%' }],
          flag: item.flag,
        })
      })
      this.prizes = prizes
    },
    getResult() {
      return new Promise((resolve, reject) => {
        axios
          .post('/LuckyDraw/goodluck', {
            mobile: this.mobile,
            // isWin: 1,
          })
          .then((res) => {
            console.log('中奖结果：', res)
            const { data } = res
            resolve(data)
          })
      })
    },
    // 获取我的奖品
    getMyPresent() {
      return new Promise((resolve, reject) => {
        axios
          .get('LuckyDraw/lucklist', {
            params: {
              mobile: this.mobile,
            },
          })
          .then((res) => {
            const { data } = res
            console.log(data)
            this.awardList = data.data
            resolve(data)
          })
      })
    },
    receivePresent() {
      this.$router.push({
        path: '/redeem',
        query: {
          detail: JSON.stringify(this.prize),
        },
      })
    },
    clickAward(item) {
      this.$router.push({
        path: '/redeem',
        query: {
          detail: JSON.stringify(item),
        },
      })
    },
    getPresentDetail(id) {
      return new Promise((resolve, reject) => {
        axios
          .get('/LuckyDraw/luckDetail', {
            params: {
              mobile: this.mobile,
            },
          })
          .then((res) => {
            const { data } = res
            console.log(data)
            resolve(data)
          })
      })
    },
    startCallBack() {
      let that = this
      this.$refs.LuckyWheel.play()
      setTimeout(() => {
        that.getResult().then((res) => {
          let flag
          that.prizes.forEach((item, index) => {
            if (item.flag === res.data.luckyKeyCode) {
              flag = index
              this.prize = res.data
            }
          })
          that.$refs.LuckyWheel.stop(flag)
        })
      }, 3000)
    },
    endCallBack(prize) {
      this.pIndex = prize.flag
      // this.prize = prize
      this.showPresentDialog = true
      // alert(`恭喜你获得${prize.title}`)
    },
    goOutPage() {
      this.showPresentDialog = false
      let url = localStorage.getItem('url')
      window.location.href = url
    },
  },
}
</script>
<style lang="scss">
.login-box {
  .van-field__control {
    color: #fff !important;
  }
}
</style>
<style lang="scss" scoped>
.login-box {
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
    width: 70%;
    height: 160px;
    margin: 60px auto 20px;
    .telephone {
      border-radius: 20px;
      background: #016e4d;
    }
    .login-btn {
      height: 44px;
      margin-top: 30px;
      background: url('../assets/images/login-btn.png') no-repeat center center;
      background-size: 100% 100%;
    }
  }
  .desc {
    color: #ccc;
    margin-top: 30px;
    padding: 0 30px;
    text-align: center;
  }
  .bounary {
    margin:0 20px;
    position: relative;
    text-align: center;
    color: #4a4a4a;
    font-weight: bold;
    .txt:after,
    .txt:before {
      position:absolute;
      top: 50%;
      background: #ddd;
      content:'';
      height: 1px;
      width: 35%;
    }
    .txt:after{
      right:0
    }
    .txt:before{
      left:0
    }
  }
  
 
  
}
</style>
