<template>
  <div>
    <div class="item">
      <router-link :to="{ name: 'ClosetDetail', params: { id: item.id } }">{{
        item.title
      }}</router-link>
    </div>
    <img v-bind:src="item.imageUrl" alt="" class="imageitem" />
  </div>
</template>

<script>
export default {
  props: ["item"],
  data() {
    return {
      images: [],
    }
  },
}
</script>

<style scoped>
.item {
  background-color: red;
}
.imageitem {
  width: 100px;
  height: 100px;
}
</style>
