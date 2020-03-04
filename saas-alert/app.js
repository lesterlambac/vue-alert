import VueAlert from './Alert.vue'
import AlertBus from './alertBus.js'

export default {
  
  install (Vue, options = {}) {

    let VueAlertInstance = Vue.extend(VueAlert)
    let Alert = new VueAlertInstance(options)

    let vm = Alert.$mount()
    document.querySelector('body').appendChild(vm.$el)

    if(Object.keys(options).length > 0){
      Vue.prototype.$options = options
    }

    Vue.prototype.$alert = {
      
      success(message, heading){
        AlertBus.$emit('success', {message, heading, type: 'success'})
      },

      error(message, heading){
        AlertBus.$emit('error', {message, heading, type: 'error'})
      },

      warning(message, heading){
        AlertBus.$emit('warning', {message, heading, type: 'warning'})
      },

      notice(message, heading){
        AlertBus.$emit('notice', {message, heading, type: 'notice'})
      }

    }

  }
}
