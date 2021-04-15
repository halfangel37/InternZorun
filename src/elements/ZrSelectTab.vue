<template>
  <div class="zr-field">
    <label class="zr-field__label" v-if="label">{{ label }}</label>
    <div class="zr-field__select">
      <div
        @click="myActive1"
        class="button"
        :class="[className, activeButton1]"
      >
        <slot name="one"></slot>
      </div>
      <hr />
      <div
        @click="myActive2"
        class="button"
        :class="[className, activeButton2]"
      >
        <slot name="two"></slot>
      </div>
      <hr v-if="medium" />
      <div
        @click="myActive3"
        v-if="medium"
        class="button"
        :class="[className, activeButton3]"
      >
        <slot name="three"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      on: true,
      on2: false,
      on3: false,
    }
  },
  props: {
    large: {
      type: Boolean,
      default: false,
    },
    medium: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: '',
    },
  },
  methods: {
    myActive1() {
      this.on = true
      this.on2 = false
      this.on3 = false
    },
    myActive2() {
      this.on2 = true
      this.on = false
      this.on3 = false
    },
    myActive3() {
      this.on3 = true
      this.on2 = false
      this.on = false
    },
  },
  computed: {
    className() {
      return {
        'button--large': this.large, //for 2 button
        'button--medium': this.medium, // for 3 button
        'button--primary': this.primary,
        'button--outline': this.outline,
      }
    },
    activeButton1() {
      return {
        'button--on': this.on,
      }
    },
    activeButton2() {
      return {
        'button--on2': this.on2,
      }
    },
    activeButton3() {
      return {
        'button--on3': this.on3,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/index.scss';

.zr-field {
  &__label {
    margin-bottom: 6px;
    display: block;
    color: $whisper;
  }
  &__select {
    background: $gunPowder;
    height: 36px;
    border-radius: 12px;
    display: flex;
  }
  .button {
    border-radius: 12px;
    color: $white;
    background: $gunPowder;
    transition: all 0.3s ease;
    &:hover {
      background: $california;
    }
    &--large {
      width: 260px;
    }
    &--medium {
      width: 173.33333px;
    }
    &--on,
    &--on2,
    &--on3 {
      background: $california;
    }
  }
}
hr {
  position: relative;
  background-color: $grey;
  margin: 9px 0;
  width: 1px;
  size: 40px;
}
</style>
