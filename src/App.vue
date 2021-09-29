<template>
  <div id="app">
    <router-view />
    <div v-if="isShowBtn" class="dialog-btn-pai" @click="goPage">
      <div>查看<br />榜单</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  data() {
    return {}
  },
  computed:{
    isShowBtn(){
      let route = this.$route;
      const arr = [
        '/',
        '/form',
        '/leader-board'
      ]
      if(arr.includes(route.path)){
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    goPage(){
      this.$router.push('/leader-board')
    }
  }
}
</script>
<style lang="scss">
html,
body {
  width: 100%;
  height: 100%;
}
#app {
  font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  position: relative;
  // background-color: #e74143;
  color: #fff;
  .err {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 50px;
  }
  .dialog-btn-pai {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0;
    top: 130px;
    width: 60px;
    height: 50px;
    border-radius: 10px 0 0 10px;
    border-right: none;
    background: #098D66;
    text-align: center;
    font-size: 14px;
  }
}
</style>
