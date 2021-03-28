<template>
  <div class="nav">
    <div class="nav--title">Mycloset</div>

    <div class="nav--buttons">
      <router-link to="/Closet" class="nav--buttons--button"
        >Closet</router-link
      >

      |
      <router-link to="/Post" class="nav--buttons--button">Post</router-link> |
      <router-link to="/PostCoordinate" class="nav--buttons--button"
        >PostCoodinate</router-link
      >
      |

      <button class="nav--buttons--button singout" v-on:click="signOut">
        Sign Out
      </button>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  methods: {
    signOut() {
      firebase.auth().signOut()
      this.$router.push({ name: "Root" })
    },
  },
}
</script>

<style>
.nav {
  display: flex;
  justify-content: space-between;
  height: 5rem;
  align-items: center;
  background-image: url(../assets/back.jpg);
  background-size: cover;
  background-position: 0px -110px;
}
.nav--title {
  padding: 1rem 3rem;
  font-family: cursive;
  font-size: 40px;
}
.nav--buttons {
  border: double 2px rgb(72, 105, 90);
  background-color: rgba(208, 221, 203, 0.822);
}
.nav--buttons--button {
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
}
.singout {
  margin-right: 1rem;
}
</style>
