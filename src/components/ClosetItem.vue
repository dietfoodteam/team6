<template>
  <div>
    <div class="item">
      {{ item.title }}
    </div>
    <img v-bind:src="item.imageUrl" alt="" />
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
</style>
