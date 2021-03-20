<template>
  <div class="item">
    <router-link
      :to="{ name: 'ClosetDetail', params: { id: item.id } }"
      class="item__titleWrapper"
    >
      <div class="item__titleWrapper__title">
        {{ item.title }}
      </div>
    </router-link>
    <img v-bind:src="item.imageUrl" alt="" class="item__image" />
    <button v-on:click="deleteItem(item.id)" class="item__delete-button">
      削除
    </button>
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
  methods: {
    deleteItem(id) {
      this.$emit("click-delete-item", id)
    },
  },
}
</script>

<style scoped>
.item {
  display: flex;
  flex-direction: column;
}
.item__titleWrapper {
  display: flex;
  justify-content: center;
  background-color: lightcoral;
}
.item__titleWrapper__title {
}
.item__image {
  display: block;
  height: 10rem;
}
.item__delete-button {
  background-color: lightgreen;
}
</style>
