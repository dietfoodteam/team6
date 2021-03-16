<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>log-in</h1>
    <div v-if="!user">
      <button v-on:click="signIn">
        サインイン
      </button>
    </div>
    <div v-else>
      <button v-on:click="signOut">さいんアウト</button>
      {{ user }}
    </div>
    <Post></Post>
    <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->

    <!-- <router-view /> -->
  </div>
</template>

<script>
import firebase from "firebase";
import Post from "./views/Post"

export default {
  components: { Post },
  data() {
    return {
      user: null,
    };
  },
  methods: {
    signIn() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider);
    },
    signOut() {
      firebase.auth().signOut();
    },
  },
  mounted() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
        // this.$store.dispatch("setUser", user);
      } else {
        this.user = null;
        // サインアウト中
        // this.$store.dispatch("setUser", undefined);
      }
    });
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* #nav {
  padding: 30px;
} */

/* #nav a {
  font-weight: bold;
  color: #2c3e50;
} */

/* #nav a.router-link-exact-active {
  color: #42b983;
} */
</style>
