<template>
  <div>
    <label v-if="label" class="zr-label">{{ label }}</label>
    <date-picker
      v-model="date"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="getValue"
    ></date-picker>
  </div>
</template>

<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import '@/extensions/date-picker.scss'

export default {
  name: 'ZrDatePicker',
  components: {
    DatePicker,
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [String, Date],
      default: '',
    },
    type: {
      type: String,
      default: 'date',
    },
  },
  data() {
    return {
      date: '',
    }
  },
  computed: {
    convertStringToDate() {
      return new Date(this.value)
    },
  },
  mounted() {
    this.date = this.convertStringToDate
  },
  methods: {
    getValue() {
      this.$emit('input', this.date)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/scss/index';

.zr-label {
  display: block;
  font-size: 16px;
  margin-bottom: 10px;
  color: $white;
}
</style>
