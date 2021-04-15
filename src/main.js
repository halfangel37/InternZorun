import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './elements'
import Vuelidate from 'vuelidate'
import OtpInput from '@bachdgvn/vue-otp-input'

Vue.use(Vuelidate)
Vue.component('ZrInputOTP', OtpInput)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
