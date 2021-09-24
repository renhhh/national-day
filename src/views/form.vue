<template>
  <div class="form-box">
    <img
      src="../assets/images/form-header.png"
      alt="表单"
      class="form-header"
    />
    <div class="container">
      <div class="form-item">
        <div class="form-desc">
          为了保证您的奖品能够顺利送达您的手中
        </div>
        <div class="form-desc">
          请务必准确填写每一栏信息
        </div>
        <div class="form-desc">
          填写表单可立即获得6张卡片
        </div>
        <div class="form-input " id="username">
          <div class="form-label">
            <span><b class="required-flag">*</b> 姓名：</span>
            <span :class="username == '' && label == '1' ? 'error-tip' : 'hide'"
              >请输入姓名</span
            >
          </div>
          <van-field v-model="username" @blur="onBsp($event, '1')" />
        </div>
        <div class="form-input" id="number">
          <div class="form-label">
            <span><b class="required-flag">*</b> 电话：</span>
            <span
              :class="this.number == '' && label == '2' ? 'error-tip' : 'hide'"
              >请输入电话</span
            >
          </div>
          <van-field v-model="number" @blur="onBsp($event, '2')" type="tel" />
        </div>
        <div class="form-input " id="email">
          <div class="form-label">
            <span><b class="required-flag">*</b> 行业：</span>
            <span
              :class="this.email == '' && label == '3' ? 'error-tip' : 'hide'"
              >请输入所属行业</span
            >
          </div>
          <van-field v-model="email" @blur="onBsp($event, '3')" />
        </div>
        <div class="form-input" id="address">
          <div class="form-label">
            <span
              ><b class="required-flag">*</b> 公司名称
              <span class="sub-label">(非世达员工)</span></span
            >
            <span
              :class="this.address == '' && label == '4' ? 'error-tip' : 'hide'"
              >请输入公司名称</span
            >
          </div>
          <van-field v-model="address" @blur="onBsp($event, '4')" />
        </div>
        <div class="form-input" id="display">
          <div class="form-label">
            <span><b class="required-flag">*</b> 是否有采购需求</span>
            <span
              :class="
                this.display == 'Выбрать' && label == '6' ? 'error-tip' : 'hide'
              "
              >该项不能为空</span
            >
          </div>
          <van-field v-model="display" @blur="onBsp($event, '4')" />
        </div>

        <div class="form-input">
          <div class="form-label">
            <div>
              填写助力码<span class="sub-label">(无助力码可不填写)</span>
            </div>
          </div>
          <van-field v-model="repairINFO" @blur="onBsp($event, '5.5')" />
        </div>

        <div class="submit-btn" style="text-align:center;margin-top: 20px;">
          <span>领取卡片</span>
          <!-- <van-button
            class="submit-btn"
            type="primary"
            
            @click="onsubmit($event)"
            >领取卡片</van-button
          > -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'formBox',
  components: {},
  filters: {},
  data() {
    return {
      username: '', //名字
      number: '', //手机号
      email: '', //邮箱
      address: '', //地址
      repair: 'Выбрать',
      repairINFO: '',

      display: '',
      displaylist: ['Да', 'Нет'],
      contacts: '', //联系人
      contactsnNumber: '', //联系人地址
      label: '', //通过判断是第几个输入框，并且input值为空，在其旁边展示警告按钮
      isrepairPickershow: false, //展示是否需保用产品
      isdisplayshow: false, //展示是否需预约上门拜访服务

      localstorageList: {
        username: '', //名字
        number: '', //手机号
        email: '', //邮箱
        address: '', //地址
        repair: 'Выбрать',
        repairINFO: '',

        display: 'Выбрать',
      },
    }
  },
  computed: {},
  watch: {},
  created() {
    // if(localStorage.getItem("url")){
    //     window.open(localStorage.getItem("url"))
    // }
    // console.log("window.location.href",window.location.href)
    // if(!document.referrer&&window.location.href.indexOf("eqxiu.com")==-1){
    //    window.location.href=`https://a.eqxiu.com/s/ScaRWX4O?bt=yxy`
    // }

    console.log('document.referrer', document.referrer)
  },
  methods: {
    // onSubmit(values) {
    //   console.log('submit', values)
    // },
    //失焦事件
    onBsp(event, label) {
      //保存lable与对应的value
      if (label == '1') {
        this.username = event.target.value
      }
      if (label == '2') {
        this.number = event.target.value
      } else if (label == '3') {
        this.email = event.target.value
      } else if (label == '4') {
        this.address = event.target.value
      } else if (label == '5') {
        this.repair = event.target.value
      } else if (label == '6') {
        this.display = event.target.value
      } else if (label == '7') {
        this.contacts = event.target.value
      } else if (label == '8') {
        this.contactsnNumber = event.target.value
      }
      this.label = label
    },
    showaddress() {
      //展示地址picker
      this.isrepairPickershow = true
    },
    onConfirm(value, index) {
      //是否需保用产品
      this.repair = value
      //隐藏是否需保用产品
      this.isrepairPickershow = false
      this.label = 5
      console.log(`当前值：${value}, 当前索引：${index}`)
    },
    onConfirms(value, index) {
      //选定联系人
      this.display = value
      //隐藏联系人picker
      this.isdisplayshow = false
      this.label == '6'
      console.log(`当前值：${value}, 当前索引：${index}`)
    },
    onChange(picker, value, index) {
      //选定地址
      this.address = value
      console.log(`onChange当前值：${value}, 当前索引：${index}`)
    },
    onCancel() {
      this.isdisplayshow = false
      this.isrepairPickershow = false
    },
    getTop(e) {
      //获得当前元素的位置
      var offset = e.offsetTop
      if (e.offsetParent != null) offset += getTop(e.offsetParent)
      return offset
    },

    onsubmit(e) {
      var getID = ''
      console.log(
        'https://dxg.bluetopo.cn/daxigua-master/?mobile=' + this.number
      )
      if (this.username == '') {
        getID = 'username'
        this.label = 1
      } else if (this.number == '') {
        getID = 'number'
        this.label = 2
      } else if (this.email == '') {
        getID = 'email'
        this.label = 3
      } else if (this.address == '') {
        getID = 'address'
        this.label = 4
      } else if (this.repair == 'Выбрать') {
        getID = 'repair'
        this.label = 5
      } else if (this.display == 'Выбрать') {
        getID = 'display'
        this.label = 6
      } else {
        let that = this
        axios({
          method: 'post',
          url: 'https://api.test.bluetopo.cn:8212/user/savesd',
          data: {
            f_RealName: this.username,
            f_Mobile: this.number,
            f_Email: this.email,
            f_Address: this.address,
            f_IsNeedProduct:
              this.repair == 'Нет' ? 0 : this.display == 'Да' ? 1 : '',
            f_ProductType: this.repairINFO,
            f_IsNeedVisit:
              this.display == 'Нет' ? 0 : this.display == 'Да' ? 1 : '',
            f_ContactName: this.contacts,
            f_ContactTel: this.contactsnNumber,
          },
        }).then(function(response) {
          console.log(response.status)
          localStorage.setItem('url', response.data.data + that.number)
          localStorage.setItem('f_Mobile', that.number)
          if (response.status == 200) {
            window.location.href = response.data.data + that.number
          }
        })
      }
      if (getID) {
        var box = document.getElementById(getID)
        var offset = box.offsetTop
        document.body.scrollTop = document.documentElement.scrollTop = offset
        scrollTo(0, offset)
      }
    },
  },
}
</script>

<style lang="scss">
.form-box {
  .van-field {
    border-radius: 12px;
  }
  .custom-cell {
    border-radius: 12px;
    height: 44px;
  }
}
</style>
<style lang="scss" scoped>
.form-box {
  .form-header {
    height: 240px;
    width: 100%;
  }
  .container {
    color: #fff;
    background: #006648;
    padding-bottom: 20px;
    .title {
      font-size: 31px;
      text-align: center;
      padding: 5px 0;
    }
    .form-item {
      padding: 12px 30px;
    }
    .form-desc {
      // line-height: 24px;
      font-size: 14px;
      margin-bottom: 6px;
      font-weight: bold;
    }

    .form-input {
      margin: 10px 0;
      .form-label {
        display: flex;
        justify-content: space-between;
        margin-bottom: 5px;
        font-size: 18px;
        .required-flag {
          color: red;
          vertical-align: middle;
        }
        .error-tip {
          box-sizing: border-box;
          display: flex;
          align-items: center;
          justify-content: center;

          background: #ff5448;
          border-radius: 12px;
          font-size: 12px;
          padding: 0 12px;
        }
      }
      .sub-title {
        padding: 6px 12px;
      }
    }
    .sub-label {
      font-size: 10px;
    }
    .submit-btn {
      width: 100px;
      margin:0 auto;
      padding: 15px 24px;
      background: #15C693;
      color: #fff;
      border-radius: 10px;
      // background:url('../assets/images/submit.png') no-repeat center center;
      // background-size: 100% 100%;
      span {
        letter-spacing: 2px;
        font-size: 16px;
      }
    }
    .show {
      display: block;
    }
    .hide {
      display: none;
    }
  }
}
</style>
