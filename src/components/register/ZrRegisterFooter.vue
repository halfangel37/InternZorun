<template>
  <div class="register__footer">
    <ZrButton class="register__button" @click.native="turnBack" block>
      Chấp nhận
    </ZrButton>
    <div class="register__footer__later" @click="turnBack">Để sau</div>
  </div>
</template>

<script>
export default {
  methods: {
    turnBack() {
      this.$router.push({ name: 'home' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/index.scss';
.register {
  &__footer {
    height: 125px;
    text-align: center;
    position: absolute;
    bottom: 0;
    margin: 0 0 0 5%;
    width: 90%;
    &__later {
      margin: 40px 0 0 0;
      color: $california;
      cursor: pointer;
    }
  }
}
</style>
