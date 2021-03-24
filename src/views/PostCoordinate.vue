<template>
  <div>
    <div>
      <h1>登録するアイテムを選択</h1>
      <select v-model="closeSeg">
        <option value="tops" selected>トップス</option>
        <option value="bottoms">ボトムス</option>
        <option value="socks">靴下</option>
        <option value="room-wear">部屋着</option>
        <option value="shoes">くつ</option>
        <option value="accessory">アクセサリー</option>
        <option value="other">その他</option>
      </select>
      <div v-for="item in items" :key="item.id" class="all__frame__box__item">
        <ClosetItem
          class="item"
          v-if="closeSeg == item.seg"
          v-bind:item="item"
          v-bind:isRegister="true"
          v-bind:isDelete="false"
          v-on:click-register-item="registerItem"
        ></ClosetItem>
      </div>
    </div>
    <div>
      <h1>選択されたアイテム</h1>
      <div
        v-for="item in selectedItems"
        :key="item.id"
        class="all__frame__box__item"
      >
        <ClosetItem
          v-bind:item="item"
          v-bind:isRegister="true"
          v-bind:isDelete="true"
          v-on:click-register-item="selectImage"
          v-on:click-delete-item="unselectItem"
        ></ClosetItem>
      </div>
    </div>
    <div>
      <h1>タイトルとコメント</h1>
      <div>
        <h3>タイトル</h3>
        <input type="text" v-model="title" />
      </div>
      <div>
        <h3>コメント</h3>
        <input type="text" v-model="comment" />
      </div>
      <div>
        <h3>画像</h3>
        <input type="file" accept="image/*" v-on:change="onFileChange" />
        <img :src="imageUrl" alt="" />
      </div>
    </div>
    <div>
      <v-btn v-on:click="upload">登録</v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import { storage } from "@/firebase"
import ClosetItem from "@/components/ClosetItem.vue"

export default {
  components: {
    ClosetItem,
  },
  data() {
    return {
      items: [],
      selectedItems: [],
      closeSeg: "tops",
      title: "",
      comment: "",
      imageUrl: "",
      imageFile: File,
    }
  },
  created() {
    firebase
      .firestore()
      .collection("closet")
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.items.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
  },
  methods: {
    registerItem(id) {
      this.selectedItems = this.items
        .filter((item) => item.id === id)
        .concat(this.selectedItems)
    },
    unselectItem(id) {
      this.selectedItems = this.selectedItems.filter((item) => item.id !== id)
    },
    async selectImage(id) {
      const imageUrl = await firebase
        .firestore()
        .collection("closet")
        .doc(id)
        .get()
        .then((doc) => {
          return doc.data().imageUrl
        })
      if (imageUrl) {
        this.imageUrl = imageUrl
      }
    },
    async onFileChange(e) {
      this.imageFile = e.target.files[0]
      const FileName = this.imageFile.name
      const storageRef = storage.ref()
      const fileRef = storageRef.child("images/" + FileName)
      await fileRef
        .put(this.imageFile)
        .then(() => fileRef.getDownloadURL())
        .then((url) => {
          this.imageUrl = url
        })
    },
    async upload() {
      const storageRef = storage.ref()
      const createdAt = new Date()
      const timestamp = createdAt.getTime()
      const uniqueFileName = timestamp + "_" + this.imageFile.name
      const fileRef = storageRef.child("images/" + uniqueFileName)
      await fileRef
        .put(this.imageFile)
        .then(() => fileRef.getDownloadURL())
        .then((url) => {
          this.url = url
          firebase
            .firestore()
            .collection("coordinate")
            .add({
              title: this.title,
              comment: this.comment,
              imageUrl: this.imageUrl,
              clothes: this.selectedItems,
            })
        })
      this.$router.push({ name: "Closet" })
    },
  },
}
</script>

<style scoped>
.item {
  padding: 0 10rem;
}
</style>
