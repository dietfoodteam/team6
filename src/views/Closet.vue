<template>
  <div class="all">
    <div class="all__frame">
      <div class="all__frame__selectWrapper">
        <select v-model="closeSeg">
          <option value="tops">トップス</option>
          <option value="bottoms">ボトムス</option>
          <option value="socks">靴下</option>
          <option value="room-wear">部屋着</option>
          <option value="shoes">くつ</option>
          <option value="accessory">アクセサリー</option>
          <option value="other">その他</option>
        </select>
      </div>
      <div class="all__frame__box">
        <div v-for="item in items" :key="item.id" class="all__frame__box__item">
          <ClosetItem
            v-if="closeSeg == item.seg"
            v-bind:item="item"
            v-on:click-delete-item="deleteItem"
          ></ClosetItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"
import ClosetItem from "../components/ClosetItem"

export default {
  components: {
    ClosetItem,
  },
  data() {
    return {
      items: [],
      closeSeg: 0,
    }
  },
  methods: {
    deleteItem(id) {
      this.items = this.items.filter((item) => item.id !== id)
    },
  },
  created() {
    firebase
      .firestore()
      .collection("closet")
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
}
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  margin-bottom: 10rem;
}
.all__frame {
  display: flex;
  flex-direction: column;
}
.all__frame__selectWrapper {
  width: 10rem;
  padding: 1rem 1rem;
  margin-right: 0.5rem;
  background-color: rgb(128, 139, 107);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.all__frame__box {
  background-color: lightgray;
  display: flex;
  justify-content: space-around;
}
.all__frame__box__list {
}
</style>
