<template>
  <div class="all">
    <v-app>
      <Nav></Nav>
      <SignIn v-if="!user"></SignIn>
      <router-view v-else />
    </v-app>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue"
import SignIn from "@/views/SignIn.vue"
import firebase from "firebase"

export default {
  components: { SignIn, Nav },
  data() {
    return {
      user: null,
    }
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user
      } else {
        this.user = null
      }
    })
  },
}
</script>
