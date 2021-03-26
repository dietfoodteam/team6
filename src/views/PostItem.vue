<template>
  <div id="app">
    <div class="all">
      <div class="top-box">
        <div class="s">
          <h1 id="register">洋服登録</h1>
        </div>
      </div>

      <div class="everypair">
        <div class="sen">
          <h3 class="h3-sen">洋服タイトル</h3>
        </div>
        <div class="right">
          <input
            type="text"
            class="title-box"
            placeholder="（例）春用ボトムス"
            v-model="closeTitle"
          />
        </div>
      </div>

      <div class="everypair">
        <div class="sen">
          <h3 class="h3-sen">洋服の種類</h3>
        </div>
        <div class="right">
          <select id="occupation" name="occupation" v-model="closeSeg">
            <option value="" selected="selected">▼選択してください</option>
            <option value="tops">トップス</option>
            <option value="bottoms">ボトムス</option>
            <option value="socks">靴下</option>
            <option value="room-wear">部屋着</option>
            <option value="shoes">くつ</option>
            <option value="accessory">アクセサリー</option>
            <option value="other">その他</option>
          </select>
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
            v-model="closeExp"
          ></textarea>
        </div>
      </div>

      <div class="everypair">
        <div class="sen">
          <h3 class="h3-sen">購入時期</h3>
        </div>
        <div class="right">
          <input class="inputDate" type="date" v-model="boughtDate" />
        </div>
      </div>
      <div class="everypair">
        <div class="sen">
          <h3 class="h3-sen">購入ショップやサイトURL</h3>
        </div>
        <div class="right">
          <input class="inputUrl" type="url" v-model="boughtShop" />
        </div>
      </div>
      <div class="everypair-img">
        <div class="sen">
          <h3 class="h3-sen">洋服の画像</h3>
        </div>
        <div class="row">
          <input
            class="selImage"
            type="file"
            accept="image/*"
            @change="onFileChange"
          />

          <div class="Image-show">
            <img v-bind:src="imageUrl" />
          </div>
        </div>
      </div>

      <div class="reg-button">
        <v-btn class="reg" depressed elevation="2" outlined @click="upload"
          >登録</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import { storage } from "@/firebase"

export default {
  data() {
    return {
      closeTitle: "",
      closeSeg: "",
      closeExp: "",
      boughtDate: "",
      boughtShop: "",
      imageUrl: "",
      imageFile: File,
    }
  },
  methods: {
    onFileChange(e) {
      this.imageFile = e.target.files[0]

      const FileName = this.imageFile.name
      const storageRef = storage.ref()
      const fileRef1 = storageRef.child("images/" + FileName)
      fileRef1
        .put(this.imageFile)
        .then(() => fileRef1.getDownloadURL())
        .then((url) => {
          this.imageUrl = url
        })
    },

    async upload() {
      // ref は reference の略。データの在り処＝住所を表すイメージ。
      const storageRef = storage.ref()

      // 同じ名前のファイルと区別できるように timestamp を追加して、ユニークなファイル名をつける
      const createdAt = new Date()
      const timestamp = createdAt.getTime()
      const uniqueFileName = timestamp + "_" + this.imageFile.name
      const fileRef = storageRef.child("images/" + uniqueFileName)

      const uid = firebase.auth().currentUser.uid
      await fileRef
        .put(this.imageFile)
        .then(() => fileRef.getDownloadURL())
        .then((url) => {
          this.url = url
          firebase
            .firestore()
            .collection("closet")
            .add({
              uid: uid,
              title: this.closeTitle,
              seg: this.closeSeg,
              explain: this.closeExp,
              date: this.boughtDate,
              shop: this.boughtShop,
              imageUrl: this.imageUrl,
            })
        })
      this.$router.push({ name: "Closet" })
    },
  },
}
</script>

<style>
.all {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
  /* background: #a1ad90; */
  background: #ebeee9;
}
.inputArea {
  display: flex;
  flex-direction: row;
  border: 1px solid black;
}
.sen {
  width: 230px;
  display: flex;
  align-items: center;
  justify-content: right;
}
.right {
  width: 400px;
  display: flex;

  align-items: center;
}

.everypair {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  height: 200px;
}
.everypair-img {
  display: flex;
  justify-content: space-evenly;
  height: 500px;
}
.h3-sen {
  text-align: right;
}
.row {
  display: flex;
  flex-direction: column;
  width: 400px;
}
.title-box {
  width: 75%;
  background: #d9ded2;
  border: 1px solid black; /* 枠線 */
}

.comment-box {
  width: 75%;
  background: #d9ded2;
  border: 1px solid black; /* 枠線 */
}

#occupation {
  border: 1px solid black; /* 枠線 */
  width: 75%;
  background: #d9ded2;
}

.Image-show {
  height: 350px;
  background: #d9ded2;
}

.Image-show img {
  width: 100%;
  height: 100%;
}

.reg-button {
  display: flex;
  justify-content: center;
}
.reg {
  width: 100px;
  height: 80px;
  font-size: 20px;
  background: #ffffff;
}
.inputDate {
  width: 75%;
  border: 1px solid black; /* 枠線 */
  background: #d9ded2;
}
.inputUrl {
  width: 75%;
  border: 1px solid black; /* 枠線 */
  background: #d9ded2;
}
.top-box {
  margin-top: 50px;
  display: flex;
  justify-content: center;
  height: 100px;
}
.s {
  border: 1px solid black; /* 枠線 */
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #a1ad90;
}
</style>
