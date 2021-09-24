<template>
  <div class="poster-box">
    <div class="header"></div>
    <div class="center bold sub-title">世达诚挚邀请您参加本次大转盘活动</div>
    <div class="center-box">
      <div>集卡</div>
      <div>"承" "诺" "•" "让" "平" "凡"</div>
      <div>"见" "证" "伟" "大" 10张卡片</div>
      <div>集齐则可参与大转盘抽奖活动</div>

      <div class="mt-10">一等奖世达爆款产品大礼包(车主礼包/家用礼包)</div>
      <div>二等奖88件套/洗车枪、三等奖DIY大礼包</div>
      <div class="mb-10">(填写表单立即获得6张卡片)</div>

      <div>邀请好友助力,每邀请一位好友可获得3张卡片</div>
      <div class="mb-10">(储存海报,邀请好友助力,记得填写助力码)</div>

      <div>邀请好友数量满足30名以上,第一名可获得大礼包</div>
      <div >(如并列以最早时间为准)</div>
      <div class="title">活动详情</div>
    </div>
    <div class="time center bold">活动时间：10月1日 - 10月7日</div>
    <div class="tip">(请截图保存图片或长按助力码复制,发送给好友)</div>
    <div class="code">sadfsdf</div>
  </div>
</template>

<script>
import axios from '../assets/js/axios'

export default {
  name: 'Poster',
  data() {
    return {
      show: false,
      active: 0,
      dialogShow: true,
      pIndex: 1,
      showPresentDialog: false,
      presentData: [
        {
          name: 'первое место безщёточная аккумуляторная ударная дрель',
          bgcolor: '#FAEFBF',
        },
        {
          name:
            'второе место аккумуляторная(беспроводная) мойка высокого давления',
          bgcolor: '#DAD9D9',
        },
        {
          name: 'третье место набор отвёрток SАТА пэн',
          bgcolor: '#F0BC75',
        },
        {
          name: 'четвёртое место набор инструментов 53 из предметов',
          bgcolor: '#F3C88F',
        },
        {
          name: 'пятое место упаковка нитриловых перчаток (10 пар)',
          bgcolor: '#F3C88F',
        },
      ],
      blocks: [
        { padding: '4px', background: '#006648' },
        { padding: '10px', background: '#fad5a4' },
        { padding: '2px', background: '#e76f51' },
      ],
      buttons: [
        {
          radius: '40px',
          imgs: [
            {
              src: require('../assets/images/present-btn.png'),
              width: '105%',
              top: '-130%',
            },
          ],
        },
      ],
      prizes: [],
      defaultConfig: { speed: 15 },
      mobile: '',
      prize: {},
      awardList: [], //我的奖品
    }
  },
  created() {
    // const mobile = localStorage.getItem('f_Mobile')
    // if (!mobile) {
    //   this.$router.push('/')
    //   return
    // }
    // this.mobile = mobile
    // this.getMyPresent()
  },
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

<style lang="scss" scoped>
.poster-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  color: #26654c;
  .header {
    height: 260px;
    background: url('../assets/images/poster-header.png') no-repeat center
      center;
    background-size: 100% 100%;
  }
  .sub-title {
    font-size: 18px;
  }
  .center {
    text-align: center;
  }
  .bold {
    font-weight: bold;
  }
  .center-box {
    box-sizing: border-box;
    position: relative;
    width: 88%;
    padding: 14px 20px;
    margin: 40px auto 20px;
    border: 2px solid #068b64;
    border-radius: 4px;
    background: #0A8C66;
    color: #fff;
    font-size: 14px;
    > div {
      line-height: 20px;
    }
    .title {
      position: absolute;
      top:-28px;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 40px;
      line-height: 40px;
      text-align:center;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 4px;
      border: 2px solid #005B3B;
      background:#fff;
      color: #27654C;
    }
   
  }
  .mt-10 {
    margin-top: 10px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
 .tip {
   margin:6px 0 12px;
   text-align:center;
   font-size: 12px;
 }
 .code {
   width: 100px;
   height: 50px;
   margin: 0 auto;
   background:#006648;
   color: #000;
   font-weight: bold;
   line-height: 50px;
   text-align:center;
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
      padding: 12px 20px;
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
