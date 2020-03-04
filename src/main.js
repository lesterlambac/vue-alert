import Vue from 'vue'
import App from './App.vue'

import Alert from '../saas-alert/app.js'
Vue.use(Alert, {
  duration: 3000,
  singleton: true,
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
