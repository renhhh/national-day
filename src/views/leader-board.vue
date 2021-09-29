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
          <tr v-for="(item,index) of list" :key="index" class="tr">
            <td>{{++index}}</td>
            <td>{{item.F_RealName}}</td>
            <td>{{item.F_InvitUserNum}}</td>
          </tr>
        </tbody>
      </table>
      <div class="header"></div>
    </div>
    <div class="btn-group">
      <span @click="goPage">继续抽奖</span>
    </div>
  </div>
</template>

<script>
import axios from '../assets/js/axios'

export default {
  name: 'Poster',
  data() {
    return {
      mobile: sessionStorage.getItem('telephone'),
      list: []
    }
  },
  created() {

    this.getList()
  },

  methods: {
    // 获取我的奖品
    getList() {
      return new Promise((resolve, reject) => {
        axios
          .get('/User/getinvitelist', {
            params: {
              page: 1,
              rows: 10000,
              mobile: this.mobile,
            },
          })
          .then((res) => {
            const { data } = res
            console.log(data)
            this.list = data.data.rows;
            resolve(data)
          })
      })
    },
    goPage(){
      this.$router.push('/home')
    }
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
    max-height: 500px;
    overflow: hidden;
    overflow-y:auto;
    background: url('../assets/images/leader-bg.png') no-repeat center center;
    background-size: 100% 100%;
    color: #fff;
    font-size: 14px;

    table {
      width: 100%;
      .thead {
        line-height: 40px;
        font-size: 16px;
        position: relative;
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
      z-index: 1;
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
