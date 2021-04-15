<template>
  <div>
    <div class="zr-login-authen-form">
      <div class="zr-login-authen-form__group">
        <ZrInputOTP
          v-model="$v.form.otpCode.$model"
          input-classes="zr-login-authen-form__input"
          separator=""
          :num-inputs="6"
          :should-auto-focus="true"
          :is-input-num="true"
          @on-change="handleOnChange"
          @on-complete="handleOnComplete"
        />
      </div>
    </div>
    <div class="zr-login-authen-validate">
      <div v-if="$v.form.otpCode.$anyDirty">
        <p v-if="!$v.form.otpCode.required">
          Field is required
        </p>
        <p v-if="!$v.form.otpCode.minLength">
          Field must have only
          {{ $v.form.otpCode.$params.minLength.min }} characters.
        </p>
      </div>
    </div>
    <div class="zr-login-authen-submit">
      <ZrButton block @click.native="submit">
        <p class="zr-login-authen-submit__title">Chấp nhận</p>
      </ZrButton>
    </div>
    <div class="zr-login-authen-back">
      <a v-if="counter === 0" class="zr-login-authen-back--a" @click="send">
        Gửi lại mã số khác
      </a>
      <p v-else class="zr-login-authen-back--a__disabled">
        Đã gửi lại mã số ({{ counter }})
      </p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      form: {
        otpCode: '',
      },
      counter: 0,
    }
  },
  validations: {
    form: {
      otpCode: {
        required,
        minLength: minLength(6),
      },
    },
  },
  computed: {
    ...mapState({
      phoneNumber: state => state.authen.phoneNumber,
      statusCode: state => state.authen.statusCode,
    }),
  },
  methods: {
    ...mapActions({
      sendCodeVerify: 'authen/sendCodeVerify',
      login: 'authen/login',
    }),
    async submit() {
      if (!this.$v.$invalid) {
        await this.login({
          phone_number: this.phoneNumber,
          code_active: this.$v.form.otpCode.$model,
        })
        if (this.statusCode === 200) {
          this.$router.push({ name: 'home' })
        } else if (this.statusCode === 401) {
          this.$router.push({ name: 'login' })
        }
      }
    },
    async send() {
      await this.sendCodeVerify(this.phoneNumber)
      this.counter = 60
      const interval = setInterval(() => {
        this.counter--
        if (this.counter === 0) {
          clearInterval(interval)
        }
      }, 1000)
    },
    handleOnComplete(value) {
      this.$v.form.otpCode.$model = value
    },
    handleOnChange(value) {
      this.$v.form.otpCode.$model = value
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/index';

.zr-login-authen-form {
  display: grid;
  grid-template-columns: auto;
  margin-top: 32px;
  column-gap: 9px;

  &__group {
    display: grid;
    grid-template-columns:
      minmax(0, 47px)
      minmax(0, 47px)
      minmax(0, 47px)
      minmax(0, 47px)
      minmax(0, 47px)
      minmax(0, 47px);
    justify-content: center;
  }

  /deep/ &__input {
    background-color: $gunPowder;
    color: $whisper;
    height: 57px;
    padding: 0 10px;
    border: 1px solid $whisper;
    border-radius: 10px;
    box-sizing: border-box;
    width: 41px;
    margin: 0 3px;
    text-align: center;

    &:focus {
      outline: none;
    }
  }
}

.zr-login-authen-submit {
  display: grid;
  grid-template-columns: 80%;
  justify-content: center;
  margin-top: 32px;

  /deep/ button {
    height: 57px;
  }

  &__title {
    font-size: 17px;
  }
}

.zr-login-authen-back {
  margin-top: 290px;
  text-align: center;
  font-size: 19px;

  &--a {
    color: $crusta;
    text-decoration: none;
  }

  &--a__disabled {
    color: $crusta;
    opacity: 0.5;
  }
}

.zr-login-authen-validate {
  display: grid;
  justify-items: center;
  margin-top: 32px;
  height: 32px;
  color: $coralRed;
}
</style>
