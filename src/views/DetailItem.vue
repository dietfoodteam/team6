<template>
  <div class="all">
    <div class="title">YOUR CLOTHES</div>
    <img v-bind:src="item.imageUrl" alt="" class="item__image" />

    <v-switch v-model="editMode" inset></v-switch>
    <!-- <button v-on:click="editItem">編集</button> -->
    <input type="text" v-model="item.title" v-if="editMode" class="deText" />
    <div v-else>{{ item.title }}</div>

    <select
      id="occupation"
      name="occupation"
      v-model="item.seg"
      v-if="editMode"
    >
      <option value="" selected="selected" class="detext">洋服の種類</option>
      <option value="tops">トップス</option>
      <option value="bottoms">ボトムス</option>
      <option value="socks">靴下</option>
      <option value="room-wear">部屋着</option>
      <option value="shoes">くつ</option>
      <option value="accessory">アクセサリー</option>
      <option value="other">その他</option>
    </select>
    <div v-else>{{ item.seg }}</div>

    <textarea v-model="item.explain" v-if="editMode" class="deText" />
    <div v-else>{{ item.explain }}</div>
    <input type="date" v-model="item.date" v-if="editMode" class="detext" />
    <div v-else>{{ item.date }}</div>
    <input type="url" v-model="item.shop" v-if="editMode" class="deText" />
    <div v-else>{{ item.shop }}</div>

    <!-- <button v-on:click="saveChanges">変更保存</button> -->
    <v-btn icon color="green" v-on:click="saveChanges">
      <v-icon>mdi-cached</v-icon>
    </v-btn>
  </div>

  <!-- {{ $route.params.id }} -->
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
  margin: 3rem;
}
.title {
  font-family: fantasy;
  background-color: powderblue;
  padding: 2rem 12rem;
  margin: 1rem;
}
.deText {
  text-align: center;
}
.item__image {
  height: 20rem;
  width: auto;
}
</style>
