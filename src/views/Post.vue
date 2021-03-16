<template>
  <div id="app">
    <h1 id="register">洋服登録</h1>
    <div>
      <div>
        洋服の画像
        <input
          type="file"
          accept="image/*"
          :disabled="disabled"
          @change="onFileChange"
        />
        <span>{{ message }}</span>
      </div>

      <div>
        <input type="text" placeholder="洋服のタイトル" v-model="closeTitle" />
        <select id="occupation" name="occupation" v-model="closeSeg">
          <option value="" selected="selected">洋服の種類</option>
          <option value="1">トップス</option>
          <option value="2">ボトムス</option>
          <option value="3">靴下</option>
          <option value="4">部屋着</option>
          <option value="5">くつ</option>
          <option value="6">アクセサリー</option>
          <option value="7">その他</option>
        </select>
      </div>
      洋服の説明
      <textarea cols="30" rows="10" v-model="closeExp"></textarea>
      <br />
      購入時期
      <input type="date" v-model="boughtDate" />
      <br />
      購入ショップやサイトのURL
      <input type="url" v-model="boughtShop" />
    </div>

    <button v-on:click="upload">登録</button><br />
  </div>
</template>

<script>
import firebase from "firebase"
import { db, storage } from "@/firebase"

export default {
  date() {
    return {
      disabled: false,
      message: "",
    }
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0]
      this.upload(file)
    },
    upload(file) {
      this.message = "アップロード中..."
      this.disabled = true

      // ref は reference の略。データの在り処＝住所を表すイメージ。
      const storageRef = storage.ref()

      // 同じ名前のファイルと区別できるように timestamp を追加して、ユニークなファイル名をつける
      const createdAt = new Date()
      const timestamp = createdAt.getTime()
      const uniqueFileName = timestamp + "_" + file.name
      const fileRef = storageRef.child("images/" + uniqueFileName)

      // fileRef の場所に file を送る。 put は "置き換える" の意味。
      // uploadTask.on("state_changed", ...) を使う方法もあるが、ひとまず then で実装する
      fileRef
        .put(file)
        .then(() => fileRef.getDownloadURL())
        // 上の then のなかで snapshot.getDownloadURL().then(...) と書いてもいいが、
        // then で続けられるやつを return すると、外側に then を続けることができ、よみやすい
        // 例 fetch(...).then(res => res.json()).then(...)
        .then((url) => {
          // storage にアップロードしたファイルに対応するドキュメントを保存する
          const image = {
            name: file.name,
            url,
            createdAt,
          }
          return db.collection("images").add(image)
        })
        .then(() => {
          this.message = "アップロード完了！"
          setTimeout(() => {
            this.message = ""
            this.disabled = false
          }, 1000)
        })

      firebase
        .firestore()
        .collection("closet")
        .add({
          //image: this.closeImage, //画像をどうやってfirebaseに入れればいいんですか？
          title: this.closeTitle,
          seg: this.closeSeg.textContent, // ここはリストの順番の数字が取り出されてしまうので値の取り出し方がわからない
          explain: this.closeExp,
          date: this.boughtDate,
          shop: this.boughtShop,
        })
    },
  },
}
</script>

<style>
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
</style>
