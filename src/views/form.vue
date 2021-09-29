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
            <span
              :class="
                loginParmas.f_RealName == '' && label == '1'
                  ? 'error-tip'
                  : 'hide'
              "
              >请输入姓名</span
            >
          </div>
          <van-field
            v-model="loginParmas.f_RealName"
            @blur="onBsp($event, '1')"
          />
        </div>
        <div class="form-input " id="email">
          <div class="form-label">
            <span><b class="required-flag">*</b> 行业：</span>
            <span
              :class="
                loginParmas.f_Industry == '' && label == '3'
                  ? 'error-tip'
                  : 'hide'
              "
              >请输入所属行业</span
            >
          </div>
          <van-field
            v-model="loginParmas.f_Industry"
            @blur="onBsp($event, '3')"
          />
        </div>
        <div class="form-input" id="address">
          <div class="form-label">
            <span
              ><b class="required-flag">*</b> 公司名称
              <span class="sub-label">(非世达员工)</span></span
            >
            <span
              :class="
                loginParmas.f_CompanyName == '' && label == '4'
                  ? 'error-tip'
                  : 'hide'
              "
              >请输入公司名称</span
            >
          </div>
          <van-field
            v-model="loginParmas.f_CompanyName"
            @blur="onBsp($event, '4')"
          />
        </div>
        <div class="form-input" id="display">
          <div class="form-label">
            <span><b class="required-flag">*</b> 是否有采购需求</span>
          </div>
          <van-radio-group
            class="custom-radio"
            v-model="loginParmas.f_IsNeedProduct"
            direction="horizontal"
          >
            <van-radio :name="1">是</van-radio>
            <van-radio :name="0">否</van-radio>
          </van-radio-group>
        </div>

        <div class="form-input">
          <div class="form-label">
            <div>
              填写助力码<span class="sub-label">(无助力码可不填写)</span>
            </div>
          </div>
          <van-field v-model="loginParmas.f_InvitCode" />
        </div>

        <div class="submit-btn" style="text-align:center;margin-top: 20px;">
          <span @click="onsubmit">领取卡片</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '../assets/js/axios'
import { Toast } from 'vant'

export default {
  name: 'formBox',
  components: {},
  filters: {},
  data() {
    return {
      userInfo: {},
      label: '',
      loginParmas: {
        f_RealName: '',
        f_Mobile: sessionStorage.getItem('telephone'),
        f_Industry: '',
        f_CompanyName: '',
        f_IsNeedProduct: 1,
        f_InvitCode: '',
      },
    }
  },
  methods: {
    onBsp(event, label) {
      this.label = label
    },

    onsubmit() {
      let form = this.loginParmas
      if (!form.f_RealName) {
        Toast.fail('姓名不能为空！')
        return
      }
      if (!form.f_Industry) {
        Toast.fail('行业不能为空！')
        return
      }
      if (!form.f_CompanyName) {
        Toast.fail('公司名称不能为空！')
        return
      }
      axios.post('/User/savesdgq', form).then((res) => {
        const { data } = res
        sessionStorage.setItem('userInfo', JSON.stringify(data.data))
        this.$router.push({
          path: '/card',
        })
        console.log(data.data)
      })
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
  .custom-radio {
    margin: 12px 0;
    padding-left: 20px;
    .van-radio__label {
      color: #f2f3f5;
    }
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
      margin: 0 auto;
      padding: 15px 24px;
      background: #15c693;
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
