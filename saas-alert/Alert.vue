<template>
  <div class="fixed top-0 left-0 right-0 z-50">
    <transition-group name="alert">
    <div v-for="(entry, key) in entries" :key="key">
      <div class="max-w-sm mx-auto text-gray-600 bg-gray-100 my-2 rounded shadow-lg relative">
        <div class="flex flex-start">
          <div :class="entry.class" class="px-3 py-3 rounded-l">
            <div v-if="entry.type == 'success'"><i class="fa fa-check fa-sm text-white" aria-hidden="true"></i></div>
            <div v-else-if="entry.type == 'warning'"><i class="fa fa-exclamation-triangle fa-sm text-white" aria-hidden="true"></i></div>
            <div v-else-if="entry.type == 'error'"><i class="fa fa-exclamation-circle fa-sm text-white" aria-hidden="true"></i></div>
            <div v-else><i class="fa fa-info-circle fa-sm text-white" aria-hidden="true"></i></div>
          </div>
          <div class="px-4 py-3">
            <strong v-if="entry.heading" class="block font-bold text-lg leading-none">{{ entry.heading }}</strong>
            <span v-if="entry.message" class="block sm:inline leading-tight">{{ entry.message }}</span>
          </div>
        </div>
        <span class="absolute top-0 bottom-0 right-0 px-4 py-3"  @click="close(key)">
          <svg class="fill-current h-5 w-5 text-gray-500 hover:text-gray-600" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/>
          </svg>
        </span>
      </div>
    </div>
    </transition-group>
  </div>
</template>

<script>
import Vue from 'vue'
import AlertBus from './alertBus.js'

let timer

export default {

  data(){
    return {
      typeClass: {
        success: 'bg-green-500',
        warning: 'bg-orange-500',
        error: 'bg-red-500',
        notice: 'bg-teal-500',
      },
      entries: [],
    }
  },

  computed: {
    duration(){
      if(this.$options.hasOwnProperty('duration')){
        return this.$options.duration
      } else {
        return false
      }
    },
    singleton(){
      if(this.$options.hasOwnProperty('singleton')){
        return this.$options.singleton
      } else {
        return false
      }
    }
  },

  created(){
    AlertBus.$on(['success', 'warning', 'error', 'notice'], (payload)=> {
      this.addEntry(payload)
    })
  },

  methods: {
    addEntry(payload){
      if(this.singleton == true){
        this.entries = []
        clearTimeout(timer)
      }

      this.entries.push({ 
        message: payload.message,
        heading: payload.heading,
        type: payload.type,
        class: this.typeClass[payload.type], 
      });

      timer = setTimeout(() => { this.close(0) }, this.duration || 1000)
    },
    
    close(key) {
      Vue.delete(this.entries, key)
    }
  }

}
</script>

<style scroped>
.alert-enter-active {
  animation: slideInUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.alert-leave-active {
  animation: fadeOutUp 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@-webkit-keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

@keyframes slideInUp {
  from {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
    visibility: visible;
  }

  to {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}

.slideInUp {
  -webkit-animation-name: slideInUp;
  animation-name: slideInUp;
}

@-webkit-keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

@keyframes fadeOutUp {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}

.fadeOutUp {
  -webkit-animation-name: fadeOutUp;
  animation-name: fadeOutUp;
}
</style>