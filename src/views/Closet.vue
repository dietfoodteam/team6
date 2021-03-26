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
            v-bind:isDelete="true"
            v-on:click-delete-item="deleteCloth"
          ></ClosetItem>
        </div>
      </div>
      <div class="all__frame__selectWrapper">
        コーデ
      </div>
      <div class="all__frame__box">
        <div
          v-for="coordinate in coordinates"
          :key="coordinate.id"
          class="all__frame__box__item"
        >
          <ClosetItem
            v-bind:item="coordinate"
            v-bind:isDelete="true"
            v-on:click-delete-item="deleteCoordinate"
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
      coordinates: [],
      closeSeg: "tops",
    }
  },
  methods: {
    deleteCloth(id) {
      this.items = this.items.filter((item) => item.id !== id)
      this.deleteItemFromFireStore(id, "closet")
    },
    deleteCoordinate(id) {
      this.coordinates = this.coordinates.filter((item) => item.id !== id)
      this.deleteItemFromFireStore(id, "coordinate")
    },
    deleteItemFromFireStore(id, collectionName) {
      firebase
        .firestore()
        .collection(collectionName)
        .doc(id)
        .delete()
    },
  },
  async created() {
    await firebase
      .firestore()
      .collection("closet")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.items.push({
            id: doc.id,
            ...doc.data(),
          })
        })
      })
    await firebase
      .firestore()
      .collection("coordinate")
      .where("uid", "==", firebase.auth().currentUser.uid)
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.coordinates.push({
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
  background-color: rgb(214, 214, 212);
}
.all__frame {
  display: flex;
  flex-direction: column;
}
.all__frame__selectWrapper {
  width: 10rem;
  padding: 1rem 1rem;
  margin: 0px 15px;
  margin-right: 0.5rem;
  background-color: rgba(165, 177, 170, 0.863);
  border: 1px solid;
  border-color: rgb(33, 63, 33);
  border-radius: 10px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.all__frame__box {
  background-color: rgba(193, 219, 192, 0.842);
  border-radius: 5px;
  margin: 25px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
}
.all__frame__box__item {
  margin: 10px;
}
</style>
