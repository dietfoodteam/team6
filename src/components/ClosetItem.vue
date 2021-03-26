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
    <v-btn
      depressed
      elevation="2"
      outlined
      rounded
      v-if="isDelete"
      v-on:click="deleteItem(item.id)"
      class="item__delete-button"
      >削除</v-btn
    >
    <button
      v-if="isRegister"
      v-on:click="registerItem(item.id)"
      class="item__delete-button"
    >
      登録
    </button>
  </div>
</template>

<script>
export default {
  props: ["item", "isDelete", "isRegister"],
  data() {
    return {
      images: [],
    }
  },
  methods: {
    deleteItem(id) {
      this.$emit("click-delete-item", id)
    },
    registerItem(id) {
      this.$emit("click-register-item", id)
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
  color: black;
  justify-content: center;
  text-decoration: none;
}
.item__titleWrapper:hover {
  text-decoration: underline;
}
.item__titleWrapper__title {
}
.item__image {
  display: block;
  height: 11rem;
}
.item__delete-button {
  background-color: white;
  color: black;
  margin: 5px;
  padding: 5px 0px;
  border-radius: 15px;
}
</style>
