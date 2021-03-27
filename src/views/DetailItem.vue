<template>
  <div class="all">
    <div class="title">YOUR CLOTHES</div>
    <img v-bind:src="item.imageUrl" alt="" class="item__image" />

    <v-switch v-model="editMode" inset></v-switch>
    <!-- <button v-on:click="editItem">編集</button> -->
    <div class="all__info">
      <h3 class="detext" style="text-align:center">タイトル</h3>
      <input type="text" v-model="item.title" v-if="editMode" class="deText" />
      <div v-else class="detext">{{ item.title }}</div>
    </div>

    <div class="all__info">
      <h3 class="detext">洋服の種類</h3>
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
      <div v-else class="detext" style="text-align:center">{{ item.seg }}</div>
    </div>

    <div class="all__info">
      <h3 class="detext" style="text-align:center">洋服の説明</h3>
      <textarea
        v-model="item.explain"
        v-if="editMode"
        class="deText"
        style="width:400px; height:100px;"
      />
      <div v-else class="detext">{{ item.explain }}</div>
    </div>

    <div class="all__info">
      <h3 class="detext" style="text-align:center">購入時期</h3>
      <input type="date" v-model="item.date" v-if="editMode" class="detext" />
      <div v-else>{{ item.date }}</div>
    </div>

    <div class="all__info">
      <h3 class="detext">購入ショップやサイトURL</h3>
      <input type="url" v-model="item.shop" v-if="editMode" class="deText" />
      <div v-else>{{ item.shop }}</div>
    </div>

    <!-- <button v-on:click="saveChanges">変更保存</button> -->
    <v-btn icon color="green" v-on:click="saveChanges" style="margin:2rem">
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
  /* text-align: center; */
  background-color: rgb(236, 236, 219);
}
.title {
  font-family: fantasy;
  background-color: rgb(181, 190, 149);
  text-align: center;
  padding: 2rem 1rem;
  margin: 1rem;
}
.all__info {
  margin: 20px;
}
.ex {
}
.deText {
  text-align: center;
  border: dotted;
  background-color: rgb(227, 235, 225);
  border-color: rgba(177, 172, 172, 0.925);
  border-width: 1px;
  margin: 10px;
}
.item__image {
  height: 20rem;
  width: auto;
}
</style>
