<template>
  <div class="home">
    <div class="header"></div>

    <div class="content">
      <LuckyWheel
        ref="LuckyWheel"
        height="330px"
        :blocks="blocks"
        :prizes="prizes"
        :buttons="buttons"
        @end="endCallBack"
        :default-config="defaultConfig"
      />
    </div>
    <!--  @click="handleClick(1)" -->
    <div class="present-btn m-style" @click="startCallBack">开始抽奖</div>

    <div class="present-btn" @click="goCardPage">集结卡片</div>
    <!-- 中奖弹框 -->
    <div class="custom-dialog" v-if="showPresentDialog">
      <div class="dialog-content">
        <!-- 中奖 -->
        <div class="dialog-sub-box">
          <div v-if="pIndex != 4" class="dialog-title-desc">恭喜!</div>
          <img
            class="dialog-img"
            v-if="pIndex == 1"
            src="../assets/images//detail/one.png"
          />
          <img
            class="dialog-img"
            v-if="pIndex == 2"
            src="../assets/images//detail/two.png"
          />
          <img
            class="dialog-img"
            v-if="pIndex == 3"
            src="../assets/images/detail/three.png"
          />
          <div v-if="pIndex == 4">
            <div class="not-title">很遗憾</div>
            <div class="not-sub-title">您未中奖</div>
          </div>
          <div class="dialog-btn-group">
            <!-- 再玩一次 -->
            <span class="play" @click="goPage">继续抽奖</span>
            <!-- 去领奖 -->
            <span v-if="pIndex != 6" class="surn" @click="receivePresent"
              >领奖</span
            >
          </div>
        </div>
        <!-- 未中奖 -->
      </div>
    </div>
    <div class="dialog-btn" @click="clickMyPresent">
      <div>我的<br />奖品</div>
    </div>
    <!-- popup -->
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: '70%' }"
    >
      <van-tabs v-model="active">
        <van-tab title="奖品详情">
          <div class="active-desc">
            <img src="../assets/images/detail/one.png" alt="一等奖" />
            <img src="../assets/images/detail/home.png" alt="家住礼包" />

            <img src="../assets/images/detail/two.png" alt="二等奖" />
            <img src="../assets/images/detail/three.png" alt="三等奖" />

            <div>
              <div class="present-time">活动日期</div>
              <div class="present-time">2021/10/1 - 2021/10/7</div>
            </div>
          </div>
        </van-tab>
        <van-tab title="我的奖品">
          <div class="active-desc">
            <div
              @click="clickAward(item)"
              class="present-item-desc"
              v-for="(item, index) of awardList"
              :key="index"
            >
              <div class="one">{{ item.luckyLevel }}</div>
              <div class="two">
                <span v-if="item.luckyLevel == '一等奖'">世达爆款产品大礼包二选一(车主礼包/家用礼包)</span>
                 <span v-if="item.luckyLevel == '二等奖'">88件套/洗车枪二选一</span>
                 <span v-if="item.luckyLevel == '三等奖'">DIY大礼包</span>
              </div>
              <div class="three">中奖时间 : {{ item.luckyTime }}</div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </van-popup>
  </div>
</template>

<script>
import axios from '../assets/js/axios'
import { Toast } from 'vant'

export default {
  name: 'Home',
  data() {
    return {
      mobile: sessionStorage.getItem('telephone'),
      show: false,
      active: 0,
      dialogShow: true,
      pIndex: 1,
      showPresentDialog: false,

      blocks: [
        { padding: '10px', background: '#006648' },
        { padding: '14px', background: '#fad5a4' },
        { padding: '4px', background: '#006648' },
      ],
      buttons: [
        {
          radius: '20px',
          imgs: [
            {
              src: require('../assets/images/point.png'),
              width: '60%',
              height: '90%',
              top: '-160%',
            },
          ],
        },
      ],
      prizes: [],
      defaultConfig: { speed: 15 },
      prize: {},
      awardList: [
        {
          luckyLevel:1,
          luckyDescribe:'12323',
          luckyTime:'12313123'
        }
      ], //我的奖品
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
    goCardPage(){
      this.$router.push('/card')
    },
    clickMyPresent(){
      this.getMyPresent()
      this.show = true
    },
    getPrizesList() {
      const prizes = []
      let data = [
        {
          name: '二等奖',
          color: '#FFFFFF',
          fontColor: '#FFD502',
          subName: '88件套',
          flag: 2,
        },
        {
          name: '一等奖',
          color: '#006648',
          fontColor: '#FFD502',
          subName: '家用礼包',
          flag: 1,
        },
        {
          name: '三等奖',
          color: '#006648',
          fontColor: '#FFD502',
          subName: 'DIY大礼包',
          flag: 3,
        },
      ]
       data.forEach((item, index) => {
        prizes.push({
          // name: item.name,
          background: index % 2 ? '#006648' : '#fff',
          fonts: [
            { text: item.name, top: '10%', fontColor: item.fontColor },
            {
              text: item.subName,
              top: '30%',
              fontColor: item.fontColor,
              lengthLimit: 30,
            },
          ],
          flag: item.flag,
        })
      })

      //----------
      // let data = [
      //   {
      //     name: '',
      //     img: require('../assets/present/2.png'),
      //     flag: 2,
      //   },
      //   {
      //     name: '',
      //     img: require('../assets/present/1.png'),
      //     flag: 1,
      //   },
      //   {
      //     name: '',
      //     img: require('../assets/present/3.png'),
      //     flag: 3,
      //   },
      //   {
      //     name: '',
      //     img: require('../assets/present/4.png'),
      //     flag: 4,
      //   },
      //   {
      //     name: '',
      //     img: require('../assets/present/5.png'),
      //     flag: 5,
      //   },
      //   // {
      //   //   name: '一等奖',

      //   //   color: '#006648',
      //   //   fontColor: '#FFD502',
      //   //   subName: '家用礼包',
      //   //   flag: 1,
      //   // },
      //   // {
      //   //   name: '二等奖',
      //   //   color: '#FFFFFF',
      //   //   fontColor: '#FFD502',
      //   //   subName: '洗车枪',
      //   //   flag: 2,
      //   // },
      //   // {
      //   //   name: '三等奖',
      //   //   color: '#006648',
      //   //   fontColor: '#FFD502',
      //   //   subName: 'DIY大礼包',
      //   //   flag: 1,
      //   // },
      //   // {
      //   //   name: '一等奖',
      //   //   color: '#FFFFFF',
      //   //   fontColor: '#FFD502',
      //   //   subName: '车主礼包',
      //   //   flag: 1,
      //   // },
      // ]
      // data.forEach((item, index) => {
      //   prizes.push({
      //     background: index % 2 ? '#006648' : '#fff',
      //     fonts: [{ text: item.name, top: '10%' }],
      //     imgs: [
      //       { src: item.img, width: '100px', height: '100px', top: '10px' },
      //     ],
      //     // fonts: [
      //     //   { text: item.name, top: '10%', fontColor: item.fontColor },
      //     //   {
      //     //     text: item.subName,
      //     //     top: '30%',
      //     //     fontColor: item.fontColor,
      //     //     lengthLimit: 30,
      //     //   },
      //     // ],
      //     flag: item.flag,
      //   })
      // })
      prizes.push({
        background: '#006648',
        fonts: [
          {
            text: '谢谢参与',
            top: '12%',
            fontColor: '#fff',
            lengthLimit: 30,
          },
        ],
        flag: 4,
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
            const { data } = res
            console.log('中奖结果：', data,data.data)

            resolve(data.data)
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
    // 获取抽奖次数
    getHasLuckyNum() {
      return new Promise((resolve) => {
        axios
          .post('/User/savesdgq', {
            f_Mobile: this.mobile,
          })
          .then((res) => {
            const { data } = res

            sessionStorage.setItem('userInfo', JSON.stringify(data.data))

            console.log(data.data)
            resolve(data.data)
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
      this.getHasLuckyNum().then((res) => {
        if (res.hasNum == 0) {
          Toast.fail('您的抽奖机会已经用完，赶快去邀请好友助力！')
          return
        } else {
          
          that.$refs.LuckyWheel.play()
          setTimeout(() => {

            that.getResult().then((res) => {
              let flag
              that.prizes.forEach((item, index) => {
                if (item.flag === res.luckyKeyCode) {
                  flag = index
                  this.prize = res
                }
              })
              that.$refs.LuckyWheel.stop(flag)
            })
          }, 3000)
        }
      })
    },
    endCallBack(prize) {
      this.pIndex = prize.flag
      // this.prize = prize
      this.showPresentDialog = true
      // alert(`恭喜你获得${prize.title}`)
    },
    goPage() {
       this.showPresentDialog = false
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
  position: relative;
  box-sizing: border-box;
  padding: 20px 30px;
  width: 100%;
  height: 100%;
  background: #fff;
  // font-size: 50px;
  // background: url('../assets/images/bg.png') no-repeat center center;
  // background-size: 100% 100%;
  .header {
    height: 200px;
    background: url('../assets/images/luck-header.png') no-repeat center center;
    background-size: 100% 100%;
  }

  .content {
    height: 330px;
  }
  .present-btn {
    width: 120px;
    background: #098d66;
    color: #fff;
    padding: 12px 0;
    text-align: center;
    border-radius: 8px;
    margin: 0 auto ;
    &:active {
      background: #2fd7a5;
    }
  }
  .m-style {
    margin:30px auto 10px;
  }
  .dialog-btn {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    top: 200px;
    width: 60px;
    height: 50px;
    border-radius: 10px 0 0 10px;
    border-right: none;
    background: #006648;
    text-align: center;
    font-size: 14px;
  }
  .active-desc {
    color: #000;
    font-size: 14px;
    padding: 12px 30px;
    .active-desc-title {
      padding: 10px 30px;
      font-size: 16px;
    }
    img {
      width: 100%;
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
    z-index: 1000;
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
