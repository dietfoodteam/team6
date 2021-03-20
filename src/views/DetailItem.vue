<template>
  <div>
    <div>YOUR CLOTHES</div>
    <button v-on:click="editItem">編集</button>
    <div>{{ item.title }}</div>
    <input type="text" v-model="item.title" v-if="editMode" />
    <button v-on:click="saveChanges">変更保存</button>
    {{ $route.params.id }}
    <select
      id="occupation"
      name="occupation"
      v-model="item.seg"
      v-if="editMode"
    >
      <option value="" selected="selected">洋服の種類</option>
      <option value="tops">トップス</option>
      <option value="bottoms">ボトムス</option>
      <option value="socks">靴下</option>
      <option value="room-wear">部屋着</option>
      <option value="shoes">くつ</option>
      <option value="accessory">アクセサリー</option>
      <option value="other">その他</option>
    </select>
    <div></div>
  </div>
</template>

<script>
import firebase from "firebase"
export default {
  data() {
    return {
      editMode: false,
      item: {
        title: "",
        seg: "",
        explain: "",
        date: "",
        shop: "",
        imageUrl: "",
      },
    }
  },
  methods: {
    editItem() {
      this.editMode = !this.editMode
    },
    updateItem() {
      firebase
        .firestore()
        .collection("closet")
        .doc(this.$route.params.id)
        .update(this.item)
    },
    saveChanges() {
      this.editItem()
      this.updateItem()
    },
  },
  created() {
    firebase
      .firestore()
      .collection("closet")
      .doc(this.$route.params.id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.item = doc.data()
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!")
        }
      })
  },
}
</script>
