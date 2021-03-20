<template>
  <div class="item">
    {{ item.title }}
  </div>
  <div v-for="image in images" :key="image.id">
    <img :src="image.url" :alt="image.name" />
    <div>{{ image.name }}</div>
  </div>
</template>

<script>
import firebase from "firebase"
import { db, storage } from "@/firebase"
export default {
  props: ["item"],
  data() {
    return {
      images: [],
    }
  },
  created() {
    firebase
      .collection("images")
      .get()
      .then((collection) => {
        this.images = collection.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          }
        })
        // 上は下のコードと同じ意味
        // map については Array.prototype.map で調べてみてください
        //
        // const images = [];
        // for (const doc of collection.docs) {
        //   images.push({
        //     id: doc.id,
        //     ...doc.data()
        //   });
        // }
        // this.images = images;
      })
  },
  mounted() {
    this.getImages()
  },
}
</script>

<style scoped>
.item {
  background-color: red;
}
</style>
