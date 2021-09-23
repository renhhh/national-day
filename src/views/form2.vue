<template>
  <div class='form-box'>
    <img src="../assets/images/form-header.png" alt="表单" class="form-header">
    <div class="container">
      <p class="title">Форма регистрации </p>
      <p class="title">пользователя</p>
      <div class="form-item">
        <p class="form-desc">
          Чтобы мы могли лучше обслуживать вас, пожалуйста, укажите следующую информацию правильно.
        </p>
        <div class="form-input">
          <div class="form-label">
            <span><b class="required-flag">*</b> Имя：</span>
            <span class=" error-tip">必填</span>
          </div>
          <van-field v-model="username" />
        </div>
        <div class="form-input">
          <div class="form-label">
            <span><b class="required-flag">*</b> Номер телефона：</span>
            <span class=" error-tip">必填</span>
          </div>
          <van-field v-model="username" />
        </div>
        <div class="form-input">
          <div class="form-label">
            <span><b class="required-flag">*</b> Эл. почта：</span>
            <span class=" error-tip">必填</span>
          </div>
          <van-field v-model="username" />
        </div>
        <div class="form-input">
          <div class="form-label">
            <span><b class="required-flag">*</b> адрес ：</span>
            <span class=" error-tip">必填</span>
          </div>
          <van-field v-model="username" />
        </div>
        <div class="form-input">
          <div class="form-label">
            <span><b class="required-flag">*</b> Да -Гарантийная замена или ремонт товара</span>
            <span class=" error-tip">必填</span>
          </div>
          <van-field v-model="username" />
        </div>
        <div class="form-input">
          <div class="form-label">
            <span><b class="required-flag">*</b>Желаете выездную демонстрацию наших товаров?</span>
            <span class=" error-tip">必填</span>
          </div>
          <van-field v-model="username" />
        </div>
        <div class="form-input">
          <div class="form-label">
            <span><b class="required-flag">*</b>Да -Контактное лицо для связи -Номер телефона</span>
            <span class=" error-tip">必填</span>
          </div>
          <div class="sub-title">
            Контактное лицо
          </div>
          <van-field v-model="username" />
          <div class="sub-title">
            Номер телефона
          </div>
          <van-field v-model="username" />
        </div>
        <van-button class="submit-btn" type="primary" block>представить</van-button>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'formBox',
  components: {},
  filters: {},
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
  },
}
</script>

<style lang="scss">
.form-box {
  .van-field {
    border-radius: 12px;
  }
}
</style>
<style lang='scss' scoped>
.form-box {
  .form-header {
    height: 280px;
  }
  .container {
    color: #e5f8bf;
    background: #006648;
    padding-bottom:20px;
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
          width: 93px;
          height: 26px;
          background: #ff5448;
          border-radius: 12px;
          font-size: 12px;
          padding: 12px;
        }
      }
      .sub-title {
        padding: 6px 12px;
      }
    }
    .submit-btn {
      margin-top:20px;
      background: #e6f9c0;
      color:#005600;
    }
  }
}
</style>