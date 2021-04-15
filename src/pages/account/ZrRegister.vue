<template>
  <div class="register">
    <div class="register__block">
      <button
        class="register__block__tab1"
        :class="activeTab1"
        @click="displayTab1"
      ></button>
      <button
        class="register__block__tab2"
        :class="activeTab2"
        @click="displayTab2"
      ></button>
    </div>
    <ZrButton ref="submit" block @click.native="submit">Register</ZrButton>
    <div class="register__tab1" v-show="showTab1">
      <p class="register__welcome">Chào mừng đến với ZoRun</p>
      <p class="register__please">
        Vui lòng hoàn thành các thông tin sau
        <br />
        để Zorun biết bạn là ai
      </p>

      <div class="register__avatar" @click="selectAvatar">
        <img class="register__avatar__image" :src="preview" />
        <img class="register__avatar__camera" src="@/assets/camera.png" />
        <br />
        <input
          ref="fileInput"
          type="file"
          class="register__avatar__file"
          @change="onFileChange"
        />
      </div>

      <div class="register__information">
        <div class="register__information__wrapp-input">
          <ZrInputText
            class="register__information__input-text"
            label="Họ tên"
            placeholder="Nhập họ tên"
            v-model.trim="$v.form.name.$model"
          />

          <div
            error
            class="register__information__input-error"
            v-if="$v.form.name.$error"
          >
            Tên phải có ít nhất 10 kí tự
          </div>
        </div>
        <!-- <div class="register__information__wrapp-input">
          <ZrInputText v-model="phoneNumber" placeholder="Nhập số điện thoại" />
        </div>-->
        <div class="register__information__wrapp-input">
          <ZrInputText
            class="register__information__input-text"
            label="Nickname"
            placeholder="Nhập nickname"
            v-model.trim="$v.form.nickName.$model"
          />
          <div
            error
            class="register__information__input-error"
            v-if="$v.form.nickName.$error"
          >
            Bạn chưa nhập nickName
          </div>
        </div>

        <div class="register__information__wrapp-input">
          <ZrDatePicker
            label="Ngày sinh"
            placeholder="Chọn ngày sinh"
            class="register__information__date"
            v-model.trim="$v.form.birthday.$model"
          />

          <div
            error
            class="register__information__input-error"
            v-if="$v.form.birthday.$error"
          >
            Bạn chưa chọn ngày sinh
          </div>
        </div>
        <div class="register__information__wrapp-input">
          <ZrSelect
            class="register__information__select"
            label="Vị trí"
            placeholder="Chọn vị trí"
            :options="position"
            v-model.trim="$v.form.selectPosition.$model"
          />

          <div
            error
            class="register__information__input-error"
            v-if="$v.form.selectPosition.$error"
          >
            Bạn chưa chọn vị trí
          </div>
        </div>
        <div class="register__information__wrapp-input">
          <ZrInputNumber
            label="Số yêu thích"
            placeholder="Chọn số yêu thích"
            class="register__information__input-number"
            v-model.trim="$v.form.favorNumber.$model"
          />

          <div
            error
            class="register__information__input-error"
            v-if="$v.form.favorNumber.$error"
          >
            Bạn chưa chọn số
          </div>
        </div>
      </div>
    </div>
    <div class="register__tab2" v-show="showTab2">
      <img
        class="register__tab2__arrow"
        src="@/assets/leftArrow.png"
        @click="displayTab1"
      />
      <p class="register__tab2__title">Chỉ số cơ thể</p>
      <p class="register__tab2__content">
        Hãy vui lòng cho chúng tôi biết chỉ số cơ thể của bạn
      </p>
      <div class="register__information__wrapp-input">
        <ZrInputNumber
          type="cm"
          label="Chiều cao"
          placeholder="Nhập chiều cao"
          class="register__information__input-number"
          v-model.trim="$v.form.height.$model"
        />

        <div
          error
          class="register__information__input-error"
          v-if="$v.form.height.$error"
        >
          Bạn chưa nhập chiều cao
        </div>
      </div>
      <div class="register__information__wrapp-input">
        <ZrInputNumber
          type="kg"
          label="Cân nặng"
          placeholder="Nhập cân nặng"
          class="register__information__input-number"
          v-model.trim="$v.form.weight.$model"
        />

        <div
          error
          class="register__information__input-error"
          v-if="$v.form.weight.$error"
        >
          Bạn chưa nhập cân nặng
        </div>
      </div>

      <div class="register__tab2__select">
        <ZrSelectTab label="Chân thuận" class="register__tab2__select" large>
          <button
            class="register__tab2__select__button"
            :value="$v.form.leg.$model"
            v-on:click="sendButtonValue($event)"
            slot="one"
          >
            Chân trái
          </button>
          <button
            class="register__tab2__select__button"
            :value="$v.form.leg.$model"
            v-on:click="sendButtonValue($event)"
            slot="two"
          >
            Chân phải
          </button>
        </ZrSelectTab>
      </div>
    </div>

    <ZrRegisterFooter />
  </div>
</template>

<script>
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import ZrRegisterFooter from '@/components/register/ZrRegisterFooter'
import { mapActions, mapState } from 'vuex'
//import api from '@/api'
export default {
  name: 'ZrRegister',
  components: { ZrRegisterFooter },
  data() {
    return {
      url: false,
      showTab1: true,
      showTab2: false,
      preview: require('../../assets/group2.png'),
      form: {
        avatar: '',
        phone: '421434234',
        name: '',
        nickName: '',
        birthday: 'Mon Oct 05 1996',
        selectPosition: '1',
        leg: '0',
        favorNumber: '',
        weight: '',
        height: '',
      },
      FILE: null,

      onTab: true,
      onTab2: false,

      position: [
        { value: '0', text: 'Tiền đạo' },
        { value: '1', text: 'Tiền vệ' },
        { value: '2', text: ' Hậu vệ' },
        { value: '3', text: 'Thủ môn' },
      ],
    }
  },
  computed: {
    activeTab1() {
      return {
        'register__block__tab1--onTab': this.onTab,
      }
    },
    activeTab2() {
      return {
        'register__block__tab2--onTab2': this.onTab2,
      }
    },
    ...mapState({
      statusCode: state => state.authen.statusCode,
      phoneNumber: state => state.authen.phoneNumber,
    }),
  },
  methods: {
    onFileChange(event) {
      let FILE = event.target.files[0]

      // let config = {
      //   header: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // }
      this.form.avatar = FILE
      this.preview = URL.createObjectURL(FILE)
      console.log(this.$v.form.avatar.$model)
    },
    selectAvatar() {
      this.$refs.fileInput.click()
    },
    ...mapActions({
      register: 'authen/register',
    }),
    submit() {
      const formData = new FormData()
      formData.append('avatar', this.$v.form.avatar.$model)
      formData.append('phone_number', this.form.phone)
      formData.append('full_name', this.$v.form.name.$model)
      formData.append('nick_name', this.$v.form.nickName.$model)
      formData.append('dob', this.$v.form.birthday.$model)
      formData.append('position', this.$v.form.selectPosition.$model)
      formData.append('favorite_number', this.$v.form.favorNumber.$model)
      formData.append('height', this.$v.form.height.$model)
      formData.append('weight', this.$v.form.weight.$model)
      formData.append('foot', this.$v.form.leg.$model)
      if (!this.$v.$invalid) {
        this.register({
          formData,
        })
        if (this.statusCode === 200) {
          this.$router.push({ name: 'home' })
        } else if (this.statusCode === 422)
          this.$router.push({ name: 'register' })
        console.log('422')
      }
      // api
      //   .post(`/register`, formData, { errorHandle: false })
      //   .then(response => {
      //     console.log(response.data)
      //   })
      //   .catch(error => {
      //     this.errors = error.response.data.errors
      //   })
      console.log(this.$v.form.avatar.$model)
    },
    // submit() {
    //   const response = api
    //     .post('/register', {
    //       avatar: this.$v.form.avatar,
    //       phone_number: this.form.phone,
    //       full_name: this.$v.form.name.$model,
    //       nick_name: this.$v.form.nickName.$model,
    //       dob: this.$v.form.birthday.$model,
    //       position: this.$v.form.selectPosition.$model,
    //       favorite_number: this.$v.form.favorNumber.$model,
    //       height: this.$v.form.height.$model,
    //       weight: this.$v.form.weight.$model,
    //       foot: this.$v.form.leg.$model,
    //     })
    //     .then(
    //       function(response) {
    //         console.log(response.data)
    //       },
    //       function(error) {
    //         console.log(error.response.data)
    //         console.log(this.form.avatar)
    //       }
    //     )
    //   console.log(response)
    // },
    sendButtonValue(e) {
      let buttonValue = e.target.value
      console.log(buttonValue)
    },
    displayTab2() {
      this.showTab1 = false
      this.showTab2 = true
      this.onTab2 = !this.onTab2
      this.onTab = false
    },
    displayTab1() {
      this.showTab1 = true
      this.showTab2 = false
      this.onTab = true
      this.onTab2 = false
    },
  },
  validations: {
    form: {
      avatar: {
        required,
      },
      name: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(30),
      },
      nickName: {
        required,
        minLength: minLength(10),
        maxLength: maxLength(30),
      },
      birthday: {
        required,
      },
      selectPosition: {
        required,
      },
      favorNumber: {
        required,
      },
      height: {
        required,
      },
      weight: {
        required,
      },
      leg: {
        required,
      },
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/index.scss';

.register {
  position: relative;
  height: 950px;
  max-width: 576px;
  margin: 0 auto; /* assuming you want it centred */

  background-color: $woodsmoke;

  &__tab1,
  &__tab2 {
    height: auto;
  }
  &__welcome,
  &__tab2__title {
    text-align: center;
    color: $white;
    font-size: 25px;
    font-weight: bold;
  }
  &__welcome {
    margin-top: 20px;
  }
  &__please,
  &__tab2__content {
    text-align: center;
    font-size: 16px;
    color: $grey;
    line-height: 1.2;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  &__please {
    text-align: center;
  }
  &__button {
    margin: auto;
    max-width: 520px;
  }
  &__block {
    display: block;

    text-align: center;

    &__tab1,
    &__tab2 {
      margin: 0 0 0 10px;
      border: 2px solid $grey;
      border-radius: 10px;
      width: 45px;
      cursor: pointer;
      &--onTab,
      &--onTab2 {
        border-color: $california;
        outline: none;
      }
    }
    button:hover {
      outline: none;
      border: 2px solid $california;
      background-color: $california;
    }
  }
  &__avatar {
    text-align: center;
    margin-bottom: 10px;
    height: 100px;
    &__file {
      margin-left: 70px;
      color: $white;
    }
    &__image {
      height: 100px;
      width: 100px;
      border-radius: 50%;
    }
    &__camera {
      position: absolute;
      margin: 75px auto;
      left: 55px;
      right: 0;
    }
  }
  &__information,
  &__tab2 {
    margin: auto;
    max-width: 90%;
    &__input-text,
    &__input-number,
    &__date,
    &__select {
      &__button {
        width: 100%;
        height: 100%;
        outline: none;
        background: inherit;
        color: inherit;
        cursor: pointer;
        border-radius: 12px;
      }
    }

    &__wrapp-input {
      height: 110px;
    }
    &__arrow {
      cursor: pointer;
    }
    &__input-error {
      color: $coralRed;
    }
  }
}
</style>
