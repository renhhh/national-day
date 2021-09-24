<template>
  <div class="leader-box">
    <div class="title">排行榜</div>
    <div class="sub-title">邀请人数排行榜TOP10</div>
    <div class="center-box">
      <table>
        <thead>
          <tr class="thead" style="z-index:999">
            <th>排名</th>
            <th>ID号</th>
            <th>邀请人数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of 10" :key="item" class="tr">
            <td>123</td>
            <td>123</td>
            <td>123</td>
          </tr>
        </tbody>
      </table>
      <div class="header"></div>
    </div>
     <div class="btn-group">
      <span>继续抽奖</span>
    </div>
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
.leader-box {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background: #fff;
  color: #26654c;
  .title {
    padding: 20px 0 10px;
    text-align: center;
    font-size: 50px;
    font-weight: bold;
  }
  .sub-title {
    margin: 0px 0 20px;
    text-align: center;
    font-weight: bold;
    font-size: 18px;
    transform: rotate(4deg);
  }
  .center {
    text-align: center;
  }
  .bold {
    font-weight: bold;
  }
  .center-box {
    position: relative;
    box-sizing: border-box;
    padding: 40px 40px;
    margin: 40px 10px 18px 20px;
    min-height: 400px;
    background: url('../assets/images/leader-bg.png') no-repeat center center;
    background-size: 100% 100%;
    color: #fff;
    font-size: 14px;

    table {
      width: 100%;
      .thead {
        line-height: 40px;
        font-size: 16px;
        position:relative;
        z-index: 100;
        font-weight: bold;
        
      }
      td {
        text-align: center;
      }
      .tr {
        background: #fff;
        color: #000;
        font-weight: bold;
        line-height: 34px;
        border-bottom: 1px dashed #000;
      }
    }
    .header {
      position: absolute;
      top: 40px;
      left: 17px;
      width: 90%;
      height: 54px;

      background: url('../assets/images/leader-header.png') no-repeat center
        center;
      background-size: 100% 100%;
      z-index:1;
    }
  }
  .mt-10 {
    margin-top: 10px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .tip {
    margin: 6px 0 12px;
    text-align: center;
    font-size: 12px;
  }
  .code {
    width: 100px;
    height: 50px;
    margin: 0 auto;
    background: #006648;
    color: #000;
    font-weight: bold;
    line-height: 50px;
    text-align: center;
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
