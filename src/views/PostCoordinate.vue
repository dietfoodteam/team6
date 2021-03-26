<template>
  <div class="all">
    <div class="top-box">
      <div class="s">
        <h1>コーディネート登録</h1>
      </div>
    </div>
    <div class="everypair">
      <div class="sen">
        <h3 class="h3-sen">タイトル</h3>
      </div>
      <div class="right">
        <input
          type="text"
          class="title-box"
          placeholder="（例）春のお出かけコーデ"
          v-model="title"
        />
      </div>
    </div>
    <div>
      <div>
        <h3>登録アイテムを選択</h3>
      </div>
      <div>
        <div class="all__frame__selectWrapper">
          <select v-model="closeSeg">
            <option value="tops" selected>トップス</option>
            <option value="bottoms">ボトムス</option>
            <option value="socks">靴下</option>
            <option value="room-wear">部屋着</option>
            <option value="shoes">くつ</option>
            <option value="accessory">アクセサリー</option>
            <option value="other">その他</option>
          </select>
        </div>
        <div class="all__frame__box">
          <div
            v-for="item in items"
            :key="item.id"
            class="all__frame__box__item"
          >
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
      </div>
    </div>
    <div>
      <h3>選択されたアイテム</h3>
      <div class="all__frame__box">
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
    </div>
    <div class="everypair">
      <div class="sen">
        <h3 class="h3-sen">コメント</h3>
      </div>
      <div class="right">
        <textarea
          class="comment-box"
          cols="30"
          rows="10"
          v-model="comment"
        ></textarea>
      </div>
    </div>

    <div class="everypair-img">
      <div class="sen">
        <h3 class="h3-sen">サムネイル画像</h3>
      </div>
      <div class="row-a">
        <input type="file" accept="image/*" v-on:change="onFileChange" />
        <div class="Image-show">
          <img :src="imageUrl" alt="" />
        </div>
      </div>
    </div>

    <div class="reg-button">
      <v-btn class="reg" depressed elevation="2" outlined v-on:click="upload"
        >登録</v-btn
      >
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
      .where("uid", "==", firebase.auth().currentUser.uid)
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
              uid: firebase.auth().currentUser.uid,
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
/* .item {
  padding: 0 10rem;
} */

.all__frame {
  display: flex;
  flex-direction: column;
}
.all__frame__selectWrapper {
  width: 10rem;
  padding: 1rem 1rem;
  margin: 0px 15px;
  margin-right: 0.5rem;
  background-color: #e6e3cc;
  border: 1px solid;
  border-color: rgb(33, 63, 33);
  border-radius: 10px;
  display: flex;
  align-items: center;
  border: 1px solid black; /* 枠線 */
  /* justify-content: center; */
}
.right-content {
  display: flex;
  flex-direction: column;
}
.all__frame__box {
  background-color: #e6e3cc;
  border-radius: 5px;
  margin: 25px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.all__frame__box__item {
  margin: 10px;
}
.everypair {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 200px;
}
.row-a {
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
}
.Image-show {
  height: 350px;
  width: 100%;
  background: #e6e3cc;
}
.Image-show img {
  width: 100%;
  height: 100%;
}
.title-box {
  width: 75%;
  background: #e6e3cc;
  border: 1px solid black; /* 枠線 */
}

.comment-box {
  width: 75%;
  background: #e6e3cc;
  border: 1px solid black; /* 枠線 */
}
</style>
