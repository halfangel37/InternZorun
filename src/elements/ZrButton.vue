<template>
  <div>
    <button class="button" :class="className">
      <slot></slot>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    className() {
      return {
        'button--block': this.block,
        'button--primary': this.primary,
        'button--outline': this.outline,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/index.scss';

.button {
  border-radius: 8px;
  padding: 12px 16px;
  color: $white;
  background: linear-gradient(to right, $flamingo, $crusta);
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
  }
  &:focus {
    outline: 0;
  }
  &--block {
    width: 100%;
  }
  &--primary {
    background: linear-gradient(to right, $flamingo, $crusta);
    color: $white;
    margin: 0 auto;
    &:hover {
      background: linear-gradient(to right, $coralRed, $flamingo);
      cursor: pointer;
    }
  }
  &--outline {
    background: transparent;
    border: $flamingo solid 2px;
    color: $crusta;
    border-radius: 8px;
    padding: 12px 16px;
    &:hover {
      background: linear-gradient(to right, $flamingo, $crusta);
      color: $white;
      cursor: pointer;
    }
  }
}
</style>
