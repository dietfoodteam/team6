<template>
  <div class="all">
    <div>YOUR CLOTHES</div>
    <v-switch v-model="editMode" inset></v-switch>
    <button v-on:click="editItem">編集</button>
    <div>{{ item.title }}</div>
    <input type="text" v-model="item.title" v-if="editMode" />
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

    <div>{{ item.explain }}</div>
    <input type="text" v-model="item.explain" v-if="editMode" />
    <div>{{ item.date }}</div>
    <input type="date" v-model="item.date" v-if="editMode" />
    <div>{{ item.shop }}</div>
    <input type="url" v-model="item.shop" v-if="editMode" />

    <button v-on:click="saveChanges">変更保存</button>
    {{ $route.params.id }}
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

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
