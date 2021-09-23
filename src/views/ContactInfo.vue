<template>
  <div class="ContactInfo">
    <div style="color:#242424; font-size:22px; margin: 30px 0 0 30px"> заполнить контактную информацию 
</div>
    <div  style="color:#ABABAB; font-size:16px;margin: 30px 0 50px 30px"> Для удобства связи, пожалуйста, заполните Ваши контактные данные </div>
     <div  style="color:#ABABAB; font-size:16px;margin: 30px 0 30px 30px"> номер телефона </div>
     <div style="margin: 30px 0 30px 30px;width:85%">
        <van-field v-model="telephone" type='tel' v-on:input="onBsp "/>
     </div>
     <div style="margin: 30px 0 30px 30px;width:85%">
        <van-button   block  :style=" {'background-color': this.disabled?'#D6D9E2':'blue'}" @click="onsubmit($event)"> представление </van-button>
     </div>
      <div style="margin: 30px 0 30px 30px;width:85%">
        <van-button  block @click="onsubmit($event)">возвращение </van-button>
     </div>
  </div>
</template>

<script>
// import axios from '../assets/js/axios'

export default {
  data() {
    return {
      telephone: '',
      disabled:true}
   },
  components: {},
   methods: {
      //change事件
    onBsp(value) {
        if(value.length>9){
          this.disabled=false
        }
    },
    onsubmit(){

    }
    }
}
</script>
<style lang="scss" scoped>

</style>
