<template>
  <div class="zr-field">
    <label class="zr-field__label" v-if="label">{{ label }}</label>
    <div class="zr-field__node">
      <input
        class="zr-field__input"
        type="number"
        :placeholder="placeholder"
        @input="input($event)"
        :value="value"
        :disabled="disable"
      />
      <div class="zr-field__type">{{ type }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZrInputText',
  props: {
    value: {
      type: [Number, String],
    },
    placeholder: {
      type: String,
      default: '',
    },
    type: {
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
  computed: {
    classType() {
      return {
        'zr-field__type': this.type,
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/index.scss';
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.zr-field {
  color: $whisper;

  margin-bottom: 0.75em;

  &__label {
    margin-bottom: 0.75em;

    display: block;
    color: $whisper;
  }

  &__control {
    box-sizing: border-box;
    display: block;
    clear: both;
    text-align: center;
  }
  &__node {
    position: relative;
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
  &__type {
    color: $whisper;
    position: absolute;
    top: 32%;
    right: 1%;
  }
}
</style>
