<template>
  <div id="app">
    <Nav></Nav>
    <!-- <img alt="Vue logo" src="./assets/logo.png" />
    <h1>log-in</h1>
    <div v-if="!user">
      <button v-on:click="signIn">
        サインイン
      </button>
    </div>
    <div v-else>
      <button v-on:click="signOut">さいんアウト</button>
      {{ user }}
    </div> -->
    <Post></Post>
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->

    <!-- <router-view /> -->
  </div>
</template>

<script>
import firebase from "firebase"
//import Post from "./views/Post"
import Nav from "@/components/Nav.vue"
export default {
  components: { Nav },
  data() {
    return {
      user: null,
    }
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider)
    },
    signOut() {
      firebase.auth().signOut()
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
        // this.$store.dispatch("setUser", user);
      } else {
        this.user = null
        // サインアウト中
        // this.$store.dispatch("setUser", undefined);
      }
    })
  },
}
</script>
