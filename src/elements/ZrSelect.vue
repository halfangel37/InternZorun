<template>
  <div :class="classSelect">
    <label v-if="label" class="zr-label">{{ label }}</label>
    <div class="zr-select" :tabindex="tabindex" @blur="open = false">
      <div
        class="zr-select__selected"
        :class="{ open: open }"
        @click="open = !open"
      >
        <div v-if="selected">
          {{ selected.text }}
        </div>
      </div>
      <div v-if="open" class="zr-select__arrow-up"></div>
      <div v-else class="zr-select__arrow-down"></div>
      <div class="zr-select__items" :class="{ selectHide: !open }">
        <div
          class="zr-select__item"
          v-for="(option, index) of options"
          :key="index"
          @click="
            selected = option
            open = false
            $emit('input', option.value)
          "
        >
          {{ option.text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZrSelect',
  props: {
    options: {
      type: Array,
      required: true,
    },
    tabindex: {
      type: Number,
      required: false,
      default: 0,
    },
    value: {
      type: [String, Number],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: this.selectedValue,
      open: false,
    }
  },
  computed: {
    classSelect() {
      return {
        'zr-disable': this.disabled,
      }
    },
    selectedValue() {
      return this.options.length > 0 ? this.options[0] : null
    },
  },
  methods: {
    checkValue() {
      let option = this.options.filter(option => option.value === this.value)
      if (option.length > 0) {
        this.selected = option[0]
      } else {
        this.selected = this.options[0]
      }
    },
  },
  mounted() {
    this.checkValue()
    this.$emit('input', this.selected.value)
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/index';

.zr-disable {
  pointer-events: none;
  opacity: 0.8;
}

.zr-label {
  display: block;
  font-size: 16px;
  margin-bottom: 10px;
  color: $white;
}

.zr-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 48px;
  line-height: 48px;
  font-size: 16px;

  &__selected {
    background-color: $gunPowder;
    border-radius: 11px;
    border: 1px solid $white;
    color: $whisper;
    padding-left: 10px;
    cursor: pointer;
    user-select: none;

    &.open {
      border: 1px solid $white;
      border-radius: 11px 11px 0px 0px;
    }
  }

  &__items {
    color: $whisper;
    border-radius: 0px 0px 11px 11px;
    overflow: hidden;
    border-right: 1px solid $white;
    border-left: 1px solid $white;
    border-bottom: 1px solid $white;
    position: absolute;
    background-color: $gunPowder;
    left: 0;
    right: 0;
    z-index: 1000;
  }

  &__item {
    color: $whisper;
    padding-left: 8px;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: $charade;
    }
  }

  .selectHide {
    display: none;
  }

  &__arrow-up {
    position: absolute;
    top: 18px;
    right: 10px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-bottom: 12px solid $white;
  }

  &__arrow-down {
    position: absolute;
    top: 18px;
    right: 10px;
    width: 0;
    height: 0;
    border-left: 6px solid transparent;
    border-right: 6px solid transparent;
    border-top: 12px solid $white;
  }
}
</style>
