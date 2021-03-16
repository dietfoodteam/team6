<template>
  <div id="app">
    <div id="Nav">
      <div id="Bar">
        <router-link to="/Closet" id="clo">Closet</router-link> |
        <router-link to="/Post" id="po">Post</router-link> |
      </div>
      <router-view />
    </div>
  </div>
</template>

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
#clo {
}
</style>
