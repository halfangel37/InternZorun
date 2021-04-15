<template>
  <div class="zr-login-authen-header">
    <router-link :to="{ name: 'login' }">
      <img
        width="31px"
        height="31px"
        src="@/assets/image/zr-left-arrow.png"
        alt=""
        class="zr-login-authen-header__arrow"
      />
    </router-link>
    <img
      width="128px"
      height="128px"
      src="@/assets/image/zr-logo-phone.png"
      alt=""
      class="zr-login-authen-header__phone"
    />
    <p class="zr-login-authen-header__title">Nhập mã số</p>
    <div class="zr-login-authen-header__message">
      Nhập mã số chúng tối vừa gửi qua SMS cho bạn ở đây
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/scss/index';

.zr-login-authen-header {
  display: grid;

  &__arrow {
    justify-self: start;
    margin-top: 32px;
    margin-left: 20px;
  }

  &__phone {
    justify-self: center;
  }

  &__title {
    justify-self: center;
    margin-top: 48px;
    font-size: 25px;
    line-height: 32px;
    letter-spacing: 0.48px;
    color: $white;
  }

  &__message {
    justify-self: center;
    margin-top: 20px;
    font-size: 16px;
    line-height: 20px;
    color: $whisper;
    opacity: 0.6;
    margin: 0px 21px;
  }
}
</style>
