<template>
  <div id="app">
    <div class="all">
      <h1 id="register">洋服登録</h1>
      <div class="everypair">
        <h4>洋服タイトル</h4>

        <input
          type="text"
          class="title-box"
          placeholder="（例）春用ボトムス"
          v-model="closeTitle"
        />
      </div>

      <div class="everypair">
        <h4>洋服の種類</h4>
        <select id="occupation" name="occupation" v-model="closeSeg">
          <option value="" selected="selected">選択してください</option>
          <option value="tops">トップス</option>
          <option value="bottoms">ボトムス</option>
          <option value="socks">靴下</option>
          <option value="room-wear">部屋着</option>
          <option value="shoes">くつ</option>
          <option value="accessory">アクセサリー</option>
          <option value="other">その他</option>
        </select>
      </div>

      <div class="explain">
        コメント
        <br />
        <textarea
          class="comment-box"
          cols="30"
          rows="10"
          v-model="closeExp"
        ></textarea>
      </div>

      <div class="date">
        購入時期
        <br />
        <input class="inputDate" type="date" v-model="boughtDate" />
      </div>
      <div class="url">
        購入ショップやサイトのURL
        <br />
        <input class="inputUrl" type="url" v-model="boughtShop" />
      </div>

      <div id="Image">
        洋服の画像
        <input
          class="selImage"
          type="file"
          accept="image/*"
          @change="onFileChange"
        />
      </div>
      <div class="Image-show">
        <img class="ActImage" v-bind:src="imageUrl" />
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

  width: 1660px;
  height: 100%;
  /* background: #a1ad90; */
  background: #ebeee9;
  text-align: center;
}
.inputArea {
  display: flex;
  flex-direction: row;
}
.everypair {
  display: flex;
  justify-content: space-evenly;
}
.title-box {
  background: #d9ded2;
  border: 1px solid black; /* 枠線 */
}

.comment-box {
  height: 300px;
  width: 450px;
  background: #d9ded2;
  border: 1px solid black; /* 枠線 */
}

#occupation {
  border: 1px solid black; /* 枠線 */

  background: #d9ded2;
}

.Image-show {
  height: 400px;
}

.Image-show img {
  width: 30%;
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
  border: 1px solid black; /* 枠線 */
  background: #d9ded2;
}
.inputUrl {
  border: 1px solid black; /* 枠線 */
  background: #d9ded2;
}

#register {
  text-align: center;
}
</style>
