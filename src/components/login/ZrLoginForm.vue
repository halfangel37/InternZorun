<template>
  <div>
    <div class="zr-login-form">
      <div class="zr-login-form__type">
        <ZrSelect v-model.trim="$v.form.type.$model" :options="options" />
        <div v-if="$v.form.type.$anyDirty">
          <p class="zr-login-form__error" v-if="!$v.form.type.required">
            Field is required
          </p>
        </div>
      </div>
      <div class="zr-login-form__phone">
        <ZrInputText
          v-model="$v.form.phone.$model"
          placeholder="Nhập số điện thoại"
        />
        <div v-if="$v.form.phone.$anyDirty">
          <p class="zr-login-form__error" v-if="!$v.form.phone.required">
            Field is required
          </p>
          <p class="zr-login-form__error" v-if="!$v.form.phone.maxLength">
            Field must have only
            {{ $v.form.phone.$params.maxLength.max }} characters.
          </p>
          <p class="zr-login-form__error" v-if="!$v.form.phone.phoneRegex">
            Field must be a phone number
          </p>
        </div>
      </div>
      <ZrButton
        ref="submit"
        class="zr-login-form__submit"
        block
        @click.native="submit"
      >
        Đăng nhập
      </ZrButton>
    </div>
    <div class="zr-login-social">
      <p class="zr-login-social__message">Hoặc đăng nhập bằng</p>
      <div class="zr-login-social__group">
        <ZrButton
          @click.native="loginFacebook"
          class="zr-login-social__facebook"
          block
        >
          <img
            width="13px"
            height="24px"
            src="@/assets/image/zr-logo-facebook.png"
            alt=""
            class="zr-login-social__logo"
          />
          <p class="zr-login-social__title">Facebook</p>
        </ZrButton>
        <GoogleLogin
          class="zr-login-social__google"
          :params="params"
          :onSuccess="loginGoogle"
        >
          <img
            width="24px"
            height="24px"
            src="@/assets/image/zr-logo-google.png"
            alt=""
            class="zr-login-social__logo"
          />
          <p class="zr-login-social__title">Google</p>
        </GoogleLogin>
      </div>
      <p class="zr-login-social__skip">Bỏ qua</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { helpers, required, maxLength } from 'vuelidate/lib/validators'
const phoneRegex = helpers.regex('phone', /^[0-9]*$/)
import GoogleLogin from 'vue-google-login'

export default {
  name: 'ZrLoginForm',
  components: {
    GoogleLogin,
  },
  data() {
    return {
      form: {
        type: '',
        phone: '',
      },
      options: [
        {
          text: '+84',
          value: '84',
        },
        {
          text: '+098',
          value: '098',
        },
      ],
      params: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID,
      },
    }
  },
  validations: {
    form: {
      type: {
        required,
      },
      phone: {
        required,
        maxLength: maxLength(9),
        phoneRegex,
      },
    },
  },
  computed: {
    ...mapState({
      statusCode: state => state.authen.statusCode,
    }),
  },
  async mounted() {
    await this.loadFacebookSDK(document, 'script', 'facebook-jssdk')
    await this.initFacebook()
  },
  methods: {
    ...mapActions({
      checkPhoneNumber: 'authen/checkPhoneNumber',
      sendCodeVerify: 'authen/sendCodeVerify',
      loginSocial: 'authen/loginSocial',
    }),

    async submit() {
      if (!this.$v.$invalid) {
        await this.checkPhoneNumber(
          this.$v.form.type.$model + this.$v.form.phone.$model
        )
        if (this.statusCode === 200) {
          await this.sendCodeVerify(
            this.$v.form.type.$model + this.$v.form.phone.$model
          )
          this.$router.push({ name: 'authen' })
        } else if (this.statusCode === 401) {
          this.$router.push({ name: 'register' })
        }
      }
    },

    async initFacebook() {
      window.fbAsyncInit = function() {
        window.FB.init({
          appId: process.env.VUE_APP_FACEBOOK_APP_ID,
          cookie: true,
          version: 'v3.1',
        })
      }
    },

    async loadFacebookSDK(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) {
        return
      }
      js = d.createElement(s)
      js.id = id
      js.src = 'https://connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    },

    async loginFacebook() {
      let vm = this
      await window.FB.login(function(response) {
        if (response.status === 'connected') {
          vm.facebookApi(response.authResponse.userID)
        }
      })
    },

    async facebookApi(value) {
      await this.loginSocial({
        social_id: value,
        social_type: 'Facebook',
      })
      if (this.statusCode === 200) {
        this.$router.push({ name: 'home' })
      } else if (this.statusCode === 201) {
        this.$router.push({ name: 'register' })
      }
    },

    async loginGoogle(googleUser) {
      const user = googleUser.getBasicProfile()
      await this.loginSocial({
        social_id: user.OU,
        social_type: 'Google',
      })
      if (this.statusCode === 200) {
        this.$router.push({ name: 'home' })
      } else if (this.statusCode === 201) {
        this.$router.push({ name: 'register' })
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/index';

.zr-login-form {
  display: grid;
  grid-template-areas: 'type phone' 'submit submit';
  column-gap: 11px;
  padding: 0px 53px;
  margin-top: 85px;

  @include xs {
    grid-template-columns: 40% 60%;
  }

  @include sm {
    grid-template-columns: 30% 70%;
  }

  @include md {
    grid-template-columns: 20% 80%;
  }

  &__type {
    grid-area: type;
    min-height: 100px;
  }

  &__phone {
    grid-area: phone;
  }

  &__submit {
    grid-area: submit;
    margin-top: 32px;

    /deep/ button {
      height: 58px;
      font-size: 17px;
    }
  }

  &__error {
    color: $coralRed;
  }
}

.zr-login-social {
  display: grid;
  justify-items: center;
  padding: 0px 53px;

  &__message {
    margin-top: 130px;
    color: $whisper;
    opacity: 0.6;
  }

  &__group {
    margin-top: 20px;
    width: 100%;
    display: grid;
    grid-template-columns: 50% 50%;
    column-gap: 11px;
  }

  &__facebook {
    /deep/ button {
      height: 57px;
      background: $azureRadiance;
      color: $white;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__google {
    height: 57px;
    background: $whisper;
    color: $woodsmoke;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:focus {
      outline: none;
    }
  }

  &__logo {
    display: inline-block;
    text-align: center;
    margin-right: 5px;
  }

  &__title {
    display: inline-block;
    text-align: center;
    margin-left: 5px;
  }

  &__skip {
    margin-top: 70.4px;
    margin-bottom: 32px;
    font-size: 19px;
    color: $crusta;
  }
}
</style>
