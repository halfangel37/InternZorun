<template>
  <div class="zr-login">
    <ZrLoginHeader />
    <ZrLoginForm />
    <img
      class="zr-login__logo"
      src="@/assets/image/zr-logo-soccer.png"
      alt=""
    />
  </div>
</template>

<script>
import ZrLoginHeader from '@/components/login/ZrLoginHeader'
import ZrLoginForm from '@/components/login/ZrLoginForm'

export default {
  name: 'ZrLogin',
  components: {
    ZrLoginHeader,
    ZrLoginForm,
  },
}
</script>

<style lang="scss" scoped>
.zr-login {
  position: relative;
  z-index: 0;
  min-height: 100vh;

  &__logo {
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: -1;
  }
}
</style>
