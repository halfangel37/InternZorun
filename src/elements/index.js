import ZrInputText from './ZrInputText'
import ZrSelect from './ZrSelect'
import ZrDatePicker from './ZrDatePicker'
import ZrButton from './ZrButton'
import ZrInputNumber from './ZrInputNumber'
import ZrSelectTab from './ZrSelectTab'
import Vue from 'vue'

const components = {
  ZrInputText,
  ZrSelect,
  ZrDatePicker,
  ZrButton,
  ZrInputNumber,
  ZrSelectTab,
}

for (const key in components) Vue.component(key, components[key])
