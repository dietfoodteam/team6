<template>
  <div id="app">
    <div id="Nav">
      <div id="Bar">
        <router-link to="/Closet" id="closet">Closet</router-link> |
        <router-link to="/Post" id="po">Post</router-link> |
        <button v-on:click="signOut">Sign Out</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  methods: {
    signOut() {
      firebase.auth().signOut()
    },
  },
}
</script>

<style>
#app {
  display: flex;
}
#Nav {
  display: flex;
  justify-content: space-around;
  flex-direction: column;
}
#Bar {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 500px;
  height: 100px;
}
</style>
