<template>
  <div class="home">
    <div class="header"></div>
    <div class="sub-title"></div>
    <div class="sup-title"></div>
    <div class="content">
      <LuckyWheel ref="LuckyWheel" height="330px" :blocks="blocks" :prizes="prizes" :buttons="buttons"
        @start="startCallBack" @end="endCallBack" :default-config="defaultConfig" />
    </div>
    <div class="rule" @click="handleClick(0)"></div>
    <div class="present-btn" @click="handleClick(1)"></div>
    <!-- 中奖弹框 -->
    <div class="custom-dialog" v-if="showPresentDialog">
      <div class="dialog-content">
        <!-- 中奖 -->
        <div class="dialog-sub-box">
          <div v-if="pIndex != 6" class="dialog-title-desc">Поздравляем!</div>
          <img class="dialog-img" v-if="pIndex == 1" src="../assets/present/1-sub.png">
          <img class="dialog-img" v-if="pIndex == 2" src="../assets/present/2-sub.png">
          <img class="dialog-img" v-if="pIndex == 3" src="../assets/present/3-sub.png">
          <img class="dialog-img" v-if="pIndex == 4" src="../assets/present/4-sub.png">
          <img class="dialog-img" v-if="pIndex == 5" src="../assets/present/5-sub.png">
          <div v-if="pIndex == 6">
            <div class="not-title">к несчастью</div>
            <div class="not-sub-title">Ты не выиграл</div>
          </div>
          <div class="dialog-btn-group">
            <!-- 再玩一次 -->
            <span class="play" @click="goOutPage">играть снова</span>
            <!-- 去领奖 -->
            <span v-if="pIndex != 6" class="surn" @click="receivePresent">Принять награду</span>
          </div>
        </div>
        <!-- 未中奖 -->
      </div>
    </div>
    <!-- <van-dialog v-model="dialogShow" :showConfirmButton="false">
      
    </van-dialog> -->
    <!-- popup -->
    <van-popup v-model="show" round position="bottom" :style="{ height: '70%' }">
      <van-tabs v-model="active">
        <van-tab title="О лотерее">
          <div class="active-desc">
            <div class="active-desc-title">Призы:</div>
            <div class="present-item" :style="{background:item.bgcolor}" v-for="(item,index) of presentData"
              :key="index">
              <span class="index">{{++index}}</span>
              <span>{{item.name}}</span>
            </div>
            <div>
              <div class="present-time">Период проведения лотереи</div>
              <div class="present-time">2021/5/17 - 2021/6/15</div>

            </div>
          </div>

        </van-tab>
        <van-tab title="Мой приз">
          <div class="active-desc">
            <div @click="clickAward(item)" class="present-item-desc" v-for="(item,index) of awardList" :key="index">
              <div class="one">{{item.luckyLevel}}</div>
              <div class="two">{{item.luckyDescribe}}</div>
              <div class="three">
                время выигрыша : {{item.luckyTime}}
              </div>
            </div>
          </div>
        </van-tab>

      </van-tabs>
    </van-popup>
  </div>
</template>

<script>
import axios from '../assets/js/axios'

export default {
  name: 'Home',
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
    const mobile = localStorage.getItem('f_Mobile')
    if (!mobile) {
      this.$router.push('/')
      return
    }
    this.mobile = mobile
    this.getMyPresent()
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
.home {
  .van-dialog {
    background: transparent;
  }
}
</style>
<style lang="scss" scoped>
.home {
  // display: flex;
  // justify-content: center;
  // align-items: center;
  box-sizing: border-box;
  padding: 20px 30px;
  width: 100%;
  height: 100%;
  font-size: 50px;
  background: url('../assets/images/bg.png') no-repeat center center;
  background-size: 100% 100%;
  .header {
    height: 80px;
    background: url('../assets/images/header.png') no-repeat center center;
    background-size: contain;
  }
  .sub-title {
    height: 60px;
    background: url('../assets/images/sub-title.png') no-repeat center center;
    background-size: contain;
  }
  .sup-title {
    height: 60px;
    background: url('../assets/images/sup-title.png') no-repeat center center;
    background-size: contain;
  }
  .content {
    height: 330px;
  }
  .present-btn {
    position: absolute;
    right: 10px;
    top: 69%;
    display: inline-block;
    width: 80px;
    height: 80px;
    background: url('../assets/images/present.png') no-repeat center center;
    background-size: contain;
  }
  .rule {
    position: absolute;
    right: 0;
    top: 30px;
    display: inline-block;
    width: 80px;
    height: 70px;
    background: url('../assets/images/rule.png') no-repeat center center;
    background-size: contain;
  }

  .active-desc {
    color: #000;
    font-size: 14px;
    .active-desc-title {
      padding: 10px 30px;
      font-size: 16px;
    }

    .present-item {
      display: flex;
      align-items: center;
      margin: 5px 10px;
      border-radius: 4px;
      height: 55px;
      word-spacing: 3px;
      // word-break: break-all;
      .index {
        margin: 0 12px 0 12px;
        font-size: 18px;
        font-weight: bold;
      }
    }
    .present-time {
      margin: 12px;
      font-weight: bold;
    }

    .present-item-desc {
      box-sizing: border-box;
      padding: 12px;
      margin: 20px 20px;
      border: 3px solid red;
      height: 100px;
      background: #ff976a;
      color: #fff;

      .two {
        margin: 6px 0;
      }
    }
  }
  .custom-dialog {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #000;
    opacity: 0.94;
  }
  .dialog-content {
    width: 290px;
    height: 380px;
    background: url('../assets/images/dialog.png') no-repeat center center;
    background-size: 100% 100%;
  }
  .dialog-sub-box {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 142px 40px 1px 52px;
    font-size: 16px;
    .dialog-title-desc {
      text-align: center;
      letter-spacing: 4px;
    }
    .not-title {
      font-size: 27px;
      font-weight: bold;
      letter-spacing: 2px;
      text-align: center;
      margin-bottom: 20px;
    }
    .not-sub-title {
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin: 20px 0 50px 0;
    }
    .dialog-img {
      width: 200px;
      margin: 16px 0 9px 0;
    }
    .dialog-btn-group {
      > span {
        display: block;
        box-sizing: border-box;
        padding: 12px 10px;
        text-align: center;
        border-radius: 18px;
        color: #000;
        margin-bottom: 12px;
      }
      .play {
        background: #faefbf;
      }
      .surn {
        background: #ff976a;
      }
    }
  }
}
</style>