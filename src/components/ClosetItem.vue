<template>
  <div class="item">
    {{ item.explain }}
    {{ item.id }}
    {{ item.seg }
  </div>
</template>

<script>
export default {
  props: ["item"],
}
</script>

<style scoped>
.item {
  background-color: red;
}
</style>
