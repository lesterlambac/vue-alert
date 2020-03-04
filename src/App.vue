<template>
  <div class="text-center">
    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 mx-1 rounded mt-48" @click="success">Success</button>
    <button class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 mx-1 rounded mt-48" @click="warning">Warning</button>
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 mx-1 rounded mt-48" @click="error">Error</button>
    <button class="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mx-1 rounded mt-48" @click="notice">Default</button>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  components: {
    HelloWorld
  },

  mounted() {
    // alertBus.$alert.success('This is a success message');
  },

  methods: {
    success(){
      this.$alert.success('This is a success message');
    },

    warning(){
      this.$alert.warning('This is a warning message');
    },

    error(){
      this.$alert.error('This is an error message', 'Error Heading');
    },

    notice(){
      this.$alert.notice('This is a notice message', 'Notice Heading');
    }
  }
}
</script>
