<template>
  <div id="app">
    <h1 id="register">洋服登録</h1>
    <div>
      <div>
        洋服の画像
        <input type="file" name="example" />
        <dir class="photo"></dir>
      </div>

      <div>
        <input type="text" placeholder="洋服のタイトル" v-model="closeTitle" />
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
      洋服の説明
      <textarea cols="30" rows="10" v-model="closeExp"></textarea>
      <br />
      購入時期
      <input type="date" v-model="boughtDate" />
      <br />
      購入ショップやサイトのURL
      <input type="url" v-model="boughtShop" />
    </div>

    <button v-on:click="postAboutClose">登録</button><br />
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      closeTitle: "",
      closeSeg: "",
      closeExp: "",
      boughtDate: "",
      boughtShop: "",
    }
  },
  methods: {
    regist: function() {
      location.href = "Closet.vue"
    },
    postAboutClose() {
      firebase
        .firestore()
        .collection("closet")
        .add({
          //image: this.closeImage, //画像をどうやってfirebaseに入れればいいんですか？
          title: this.closeTitle,
          seg: this.closeSeg, // ここはリストの順番の数字が取り出されてしまうので値の取り出し方がわからない
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
