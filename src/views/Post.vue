<template>
  <div id="app">
    <div class="all">
      <h1 id="register">洋服登録</h1>
      <div class="inputArea">
        <div class="left-block">
          <div class="left-upper">
            <div class="title">
              洋服のタイトル
              <br />
              <input
                type="text"
                class="title-box"
                placeholder="（例）春用ボトムス"
                v-model="closeTitle"
                style="’font-size:40em"
              />
            </div>
            <div class="segment">
              洋服の種類
              <br />
              <select id="occupation" name="occupation" v-model="closeSeg">
                <option value="" selected="selected">洋服の種類</option>
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
        </div>
        <div class="right-block">
          <div class="right-upper">
            <div id="Image">
              洋服の画像
              <input type="file" accept="image/*" @change="onFileChange" />
            </div>
            <div class="Image-show">
              <img v-bind:src="imageUrl" />
            </div>
          </div>
          <div class="right-lower">
            <div class="date">
              購入時期
              <br />
              <input type="date" v-model="boughtDate" />
            </div>
            <div class="url">
              購入ショップやサイトのURL
              <br />
              <input type="url" v-model="boughtShop" />
            </div>
          </div>
        </div>
      </div>
      <div class="reg-button">
        <button class="reg" v-on:click="upload">登録</button><br />
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

    upload() {
      // ref は reference の略。データの在り処＝住所を表すイメージ。
      const storageRef = storage.ref()

      // 同じ名前のファイルと区別できるように timestamp を追加して、ユニークなファイル名をつける
      const createdAt = new Date()
      const timestamp = createdAt.getTime()
      const uniqueFileName = timestamp + "_" + this.imageFile.name
      const fileRef = storageRef.child("images/" + uniqueFileName)
      fileRef
        .put(this.imageFile)
        .then(() => fileRef.getDownloadURL())
        .then((url) => {
          this.url = url
          firebase
            .firestore()
            .collection("closet")
            .add({
              title: this.closeTitle,
              seg: this.closeSeg,
              explain: this.closeExp,
              date: this.boughtDate,
              shop: this.boughtShop,
              imageUrl: this.imageUrl,
            })
        })
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
}
.inputArea {
  display: flex;
  flex-direction: row;
}
.left-block {
  width: 70%;
  height: 500px;
  justify-content: center;
}
.right-block {
  width: 50%;
}
.left-upper {
  display: flex;
  flex-direction: row;
  height: 150px;
}
.right-upper {
  height: 550px;
}
.right-lower {
  display: flex;
  flex-direction: row;
  height: 100px;
}
.title-box {
  width: 200px;
  font: 100px;
}
.seg-box {
  width: 200px;
}
.comment-box {
  height: 300px;
  width: 450px;
}
.title {
  width: 50%;
}
.Image-show {
  height: 400px;
}
.Image-show img {
  width: 100%;
}
.date {
  width: 300px;
}
.reg-button {
  display: flex;
  justify-content: center;
}
.reg {
  width: 100px;
  height: 80px;
  font-size: 20px;
}

#register {
  font-family: fantasy;
  color: #524f4c;
  background-color: rgb(194, 177, 194);
  text-align: center;
}
.photo {
  width: 300px;
  height: 200px;
}

input.inputTitle {
  width: 20%;
}
</style>
