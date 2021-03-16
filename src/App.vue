<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
<h1>log-in</h1>
  </div>

  
</template>

<script>

export default {
  data() {
    return {
      inputName: ""
    }
  },
  methods: {
     updateUserName() {
      // ...
      this.$store.dispatch("updateUserProfile", {
        name: this.inputName
      })
    },
  },
}



</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
