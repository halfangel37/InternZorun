<template>
  <div class="zr-field">
    <label class="zr-field__label" v-if="label">{{ label }}</label>

    <input
      class="zr-field__input"
      type="text"
      :placeholder="placeholder"
      @input="input($event)"
      :value="value"
      :disabled="disable"
    />
  </div>
</template>

<script>
export default {
  name: 'ZrInputText',
  props: {
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disable: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    input(event) {
      this.$emit('input', event.target.value)
    },
  },
  computed: {},
}
</script>

<style lang="scss" scoped>
@import '@/scss/index.scss';
.zr-field {
  color: $whisper;

  &__label {
    margin-bottom: 12px;

    display: block;

    color: $whisper;
  }

  &__control {
    box-sizing: border-box;
    display: block;
    clear: both;
    text-align: center;
  }

  &__input {
    background-color: $gunPowder;
    color: $whisper;
    height: 48px;
    padding: 0 10px;
    border: 1px solid $whisper;
    border-radius: 10px;
    box-sizing: border-box;
    width: 100%;

    &:focus {
      outline: none;
    }
  }
}
</style>
