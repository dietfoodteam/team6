<template>
  <div class="all">
    <h1 class="all--title">サインインしてください。</h1>
    <div class="all--singinbotton" v-if="!user">
      <v-btn
        block
        v-on:click="signIn"
        color="primary"
        elevation="5"
        large
        outlined
        >sing-in</v-btn
      >
    </div>
    <div v-else>
      <v-btn
        v-on:click="signOut"
        color="primary"
        depressed
        disabled
        elevation="8"
        >sing-out
      </v-btn>
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
      this.$router.push({ name: "Closet" })
    },
    signOut() {
      firebase.auth().signOut()
      this.$router.push({ name: "Root" })
    },
  },
}
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.all--title {
  margin-top: 10rem;
  margin-bottom: 5rem;
  text-align: center;
}
.all--singinbotton {
  width: 20rem;
}
</style>
