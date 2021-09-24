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
      <img src="../assets/images/card/cheng.png" alt="承" />
      <img src="../assets/images/card/nuo.png" alt="诺" />
      <img src="../assets/images/card/circle.png" alt="点" />
      <img src="../assets/images/card/rang.png" alt="让" />
      <img src="../assets/images/card/ping.png" alt="平" />
      <img src="../assets/images/card/fan.png" alt="凡" />
      <img src="../assets/images/card/jian.png" alt="见" />
      <img src="../assets/images/card/zheng.png" alt="证" />
      <img src="../assets/images/card/empty.png" alt="证" />
      <img src="../assets/images/card/empty.png" alt="证" />
    </div>

    <div class="btn-group">
      <span>请TA助力</span>
      <span>即刻抽奖</span>
    </div>
  </div>
</template>

<script>
import axios from '../assets/js/axios'

export default {
  name: 'Card',
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
    text-align:center;
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
