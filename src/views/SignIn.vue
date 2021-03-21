<template>
  <div>
    <h1>log-in</h1>
    <div v-if="!user">
      <v-btn block v-on:click="signIn">
        Block Button
      </v-btn>
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
