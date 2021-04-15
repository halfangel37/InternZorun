<template>
  <div class="zr-login-header">
    <img
      class="zr-login-header__logo"
      src="@/assets/image/zr-logo.png"
      alt=""
      width="160px"
      height="134px"
    />
    <div class="zr-login-header__message">
      <p>Chào mừng bạn đến với ZoRun</p>
      <p>Nhập số điện thoại của bạn để tiếp tục</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZrLoginHeader',
}
</script>

<style lang="scss" scoped>
@import '@/scss/index';

.zr-login-header {
  display: grid;
  justify-items: center;

  &__logo {
    margin-top: 76px;
  }

  &__message {
    display: grid;
    justify-items: center;
    margin-top: 30px;
    font-size: 16px;
    color: $whisper;
    opacity: 0.6;
    line-height: 20px;
    letter-spacing: 0;
  }
}
</style>
