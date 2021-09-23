<template>
  <div class='form-box'>
    <img src="../assets/images/form-header.png" alt="表单" class="form-header">
    <div class="container">
      <p class="title">Форма регистрации </p>
      <p class="title">пользователя</p>
      <div class="form-item">
        <p class="form-desc">
          Чтобы мы могли лучше обслуживать вас,  пожалуйста, укажите следующую информацию правильно.
        </p>
        <div class="form-input " id="username">
          <div class="form-label">
            <span><b class="required-flag">*</b> Имя：</span>
            <span :class="(this.username==''&&label=='1')?'error-tip':'hide'">этот пункт необходимо заполнить</span>
          </div>
          <van-field v-model="username" @blur="onBsp($event,'1')" />
        </div>
        <div class="form-input" id="number">
          <div class="form-label">
            <span><b class="required-flag">*</b> Номер телефона：</span>
            <span :class="(this.number==''&&label=='2')?'error-tip':'hide'">этот пункт необходимо заполнить</span>
          </div>
          <van-field v-model="number" @blur="onBsp($event,'2')" type='tel' />
        </div>
        <div class="form-input " id="email">
          <div class="form-label">
            <span><b class="required-flag">*</b> Эл. почта：</span>
            <span :class="(this.email==''&&label=='3')?'error-tip':'hide'">этот пункт необходимо заполнить</span>
          </div>
          <van-field v-model="email" @blur="onBsp($event,'3')" />
        </div>
        <div class="form-input" id="address">
          <div class="form-label">
            <span><b class="required-flag">*</b> адрес ：</span>
            <span :class="(this.address==''&&label=='4')?'error-tip':'hide'">этот пункт необходимо заполнить</span>
          </div>
          <van-field v-model="address" @blur="onBsp($event,'4')"  />
          <!-- <div :style="{ display: (label==4?block:none) }">
                   <van-picker title="адрес " show-toolbar :columns="repairlist" @confirm="onConfirm" @cancel="onCancel"
              confirm-button-text='Подтвердить ' cancel-button-text='отмена ' />
          </div> -->
          
          <!-- @click-input="isPickershow = true" -->
          <!-- <van-cell class="custom-cell" :value="address" @click="isPickershow = true"/>
          <van-popup v-model="isPickershow" round position="bottom" :style="{ height: '30%' }">
            <van-picker title="адрес " show-toolbar :columns="columns" @confirm="onConfirm" @cancel="onCancel"
              confirm-button-text='Подтвердить ' cancel-button-text='отмена ' />
          </van-popup> -->
            
        </div>
        
        <div class="form-input" id="repair">
          <div class="form-label">
            <span><b class="required-flag">*</b> Желаете обратиться с вопросом гарантийного обслуживания?</span>
            <span :class="(this.repair=='Выбрать'&&label=='5')?'error-tip':'hide'">этот пункт необходимо заполнить</span>
          </div>
          <!-- <van-field v-model="repair" @blur="onBsp($event,'5')" @focus="isrepairPickershow = true"/>
          <div :class="[isrepairPickershow==true ? 'show' : 'hide' ,]">
              <van-picker title="адрес " show-toolbar :columns="repairlist" @confirm="onConfirm" @cancel="onCancel"
              confirm-button-text='Подтвердить ' cancel-button-text='отмена ' style="width:85%;height:300px" />
          </div> -->
          
           <van-cell class="custom-cell" :value="repair" @click="isrepairPickershow = true"/>
            <van-popup v-model="isrepairPickershow" round position="bottom" :style="{ height: '51%' }">
            <van-picker title="адрес " show-toolbar :columns="repairlist" @confirm="onConfirm" @cancel="onCancel"
              confirm-button-text='Подтвердить ' cancel-button-text='отмена ' />
          </van-popup>
        </div>
        <div class="form-input" >
          <div class="form-label">
            <span>Да -Гарантийная замена или ремонт товара</span>
          </div>
          <van-field v-model="repairINFO" @blur="onBsp($event,'5.5')" />
           
        </div>
        <div class="form-input" id="display">
          <div class="form-label">
            <span><b class="required-flag">*</b>Желаете выездную демонстрацию наших товаров?</span>
            <span :class="(this.display=='Выбрать'&&label=='6')?'error-tip':'hide'">этот пункт необходимо заполнить</span>
          </div>
          <van-cell class="custom-cell" :value="display" @click="isdisplayshow = true"/>
            <van-popup v-model="isdisplayshow" round position="bottom" :style="{ height: '50%' }">
            <van-picker title="адрес " show-toolbar :columns="displaylist" @confirm="onConfirms" @cancel="onCancel"
              confirm-button-text='Подтвердить ' cancel-button-text='отмена ' />
          </van-popup>
        </div>
        <div class="form-input">
          <div class="form-label">
            <!-- <span><b class="required-flag">*</b>Да -Контактное лицо для связи -Номер телефона</span> -->
            <!-- <span class=" error-tip">必填</span> -->
          </div>
          <div class="sub-title">
            Контактное лицо
          </div>
          <van-field v-model="contacts" @blur="onBsp($event,' 7')" />
          <div class="sub-title">
            Номер телефона
          </div>
          <van-field v-model="contactsnNumber" @blur="onBsp($event,'8')" type='tel' />
           <van-button class="submit-btn" type="primary" block @click="onsubmit($event)">представить</van-button>
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
      repairINFO:"",
      repairlist:["Да","Нет"],
      display: 'Выбрать',
      displaylist:["Да","Нет"],
      contacts: '', //联系人
      contactsnNumber: '', //联系人地址
      label: '', //通过判断是第几个输入框，并且input值为空，在其旁边展示警告按钮
      isrepairPickershow: false, //展示是否需保用产品
      isdisplayshow: false, //展示是否需预约上门拜访服务
      columns: [
        'москва',
        ' санкт - петербург',
        'севастополь',
        ' ненецкий автономный округ ',
        ' Ханты - Мансийский автономный округ ',
        ' чукотский автономный округ ',
        'ямало - ненецкий автономный округ',
        ' Республика адиг ',
        ' республика алтай ',
        ' башкортостанская Республика ',
        ' Республика Бурятия ',
        ' Дагестанская Республика ',
        ' Республика Ингушетия ',
        ' кабардино - Балкарская Республика ',
        ' Республика Калмыкия - халимгтанги ',
        ' карачаево - Черкесская Республика ',
        ' республика карелия ',
        ' республика коми ',
        'Республика Мариэль',
        'республика мордовия',
        'Республика Саха (Якутия)',
        'Республика Северная Осетия',
        'Республика Татарстан',
        'Республика Тыва',
        'Республика удмурт',
        'Республика хакас',
        'Чеченская Республика',
        'чувашская республика',
        'республика крым',
        'амурская, Архангельская',
        'астраханская',
        'Белгородская',
        'Брянская',
        'владимирская',
        'Волгоградская',
        'вологодская',
        'Воронежская',
        'ивановская',
        'иркутская',
        'Калининградская',
        'Калужская',
        'Кировская',
        'Костромская',
        'Курганская',
        'курская',
        'Ленинградская область',
        ' Магаданская область',
        'московская область',
        'мурманская область',
        'нижний новгород',
        ' Новгородская область',
        'Новосибирская область',
        'Омская область',
        'оренбургская область',
        'Пензенская область',
        'Псковская область',
        'Ростовская область',
        'рязанская область',
        'Самарская область',
        'саратовская область',
        'сахалинская область',
        'свердловская область',
        'Смоленская область',
        'Тамбовская область',
        'Тверская',
        'Томская',
        'Тульская',
        'Тюменская',
        'Ульяновская',
        'челябинская',
        'Липецкая',
        'кемеровская',
        'ярославская область',
        'алтайский край',
        'краснодарский край',
        'Красноярский край',
        'приморский край',
        'Ставропольский край',
        'хабаровский край',
        'пермский край',
        'Камчатский край',
        'забайкальский край',
        ' Еврейская автономная область ',
        'Прочее ',
      ],
      localstorageList:{
      username: '', //名字
      number: '', //手机号
      email: '', //邮箱
      address: '', //地址
      repair: 'Выбрать',
      repairINFO:"",
      repairlist:["Да","Нет"],
      display: 'Выбрать',
      }
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
    
    console.log('document.referrer',document.referrer)
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
      this.label=5
      console.log(`当前值：${value}, 当前索引：${index}`)
    },
    onConfirms(value, index) {
      //选定联系人
      this.display = value
      //隐藏联系人picker
      this.isdisplayshow = false
      this.label=='6'
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
      console.log('https://dxg.bluetopo.cn/daxigua-master/?mobile='+this.number)
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
      }else{
        let that=this
        axios({
          method:'post',
          url:'https://api.test.bluetopo.cn:8212/user/savesd',
          data: {
              "f_RealName": this.username,
              "f_Mobile": this.number,
              "f_Email": this.email,
              "f_Address": this.address,
              "f_IsNeedProduct":this.repair=="Нет"?0:this.display=="Да"?1:"",
              "f_ProductType": this.repairINFO,
              "f_IsNeedVisit": this.display=="Нет"?0:this.display=="Да"?1:"",
              "f_ContactName":  this.contacts,
              "f_ContactTel":  this.contactsnNumber
            }
        })
        .then(function(response) {
          console.log(response.status)
          localStorage.setItem("url",response.data.data+that.number )
          localStorage.setItem("f_Mobile",that.number )
          if(response.status==200){
              window.location.href=response.data.data+that.number
          }
      });
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
    height:44px;
  }
}
</style>
<style lang='scss' scoped>
.form-box {
  .form-header {
    height: 280px;
    width:100%;
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
      line-height: 24px;
      font-size: 18px;
      margin-bottom: 20px;
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
    .submit-btn {
      margin-top: 20px;
      background: #e6f9c0;
      color: #005600;
    }
    .show{
      display: block;
     
    }
    .hide {
      display: none;
    }
  }
}
</style>