<template>
  <div>
    <h1>log-in</h1>
    <div v-if="!user">
      <button v-on:click="signIn">
        サインイン
      </button>
    </div>
    <div v-else>
      <button v-on:click="signOut">サインアウト</button>
      {{ user }}
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
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
}
</script>
