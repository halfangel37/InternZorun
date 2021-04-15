<template>
  <div class="zr-login-authen">
    <ZrLoginAuthenHeader />
    <ZrLoginAuthenForm />
  </div>
</template>

<script>
import ZrLoginAuthenHeader from '@/components/login/ZrLoginAuthenHeader'
import ZrLoginAuthenForm from '@/components/login/ZrLoginAuthenForm'

export default {
  name: 'ZrLoginAuthen',
  components: {
    ZrLoginAuthenHeader,
    ZrLoginAuthenForm,
  },
}
</script>

<style lang="scss" scoped>
.zr-login-authen {
  position: relative;
  z-index: 0;
  min-height: 100vh;
}
</style>
