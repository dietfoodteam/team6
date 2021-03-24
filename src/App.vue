<template>
  <div class="all">
    <v-app>
      <Nav></Nav>
      <router-view />
    </v-app>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue"
import firebase from "firebase"

export default {
  components: { Nav },
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
