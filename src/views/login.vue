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
import { Toast } from 'vant'
export default {
  name: 'Login',
  data() {
    return {
      tel: '',
    }
  },
  created() {},

  methods: {
    clickLogin() {
      if (this.tel === '') {
        Toast.fail('手机号不能为空！')
        return
      }
      axios
        .post('/User/savesdgq', {
          f_Mobile: this.tel,
        })
        .then((res) => {
          const { data } = res
          sessionStorage.setItem('telephone', this.tel)
          sessionStorage.setItem('userInfo', JSON.stringify(data.data))
          let isExist = data.data.isExist
          if (isExist) {
            this.$router.push({
              path: '/card',
            })
          } else {
            this.$router.push({
              path: '/form',
            })
          }
          console.log(data.data)
        })
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
    margin: 0 20px;
    position: relative;
    text-align: center;
    color: #4a4a4a;
    font-weight: bold;
    .txt:after,
    .txt:before {
      position: absolute;
      top: 50%;
      background: #ddd;
      content: '';
      height: 1px;
      width: 35%;
    }
    .txt:after {
      right: 0;
    }
    .txt:before {
      left: 0;
    }
  }
}
</style>
