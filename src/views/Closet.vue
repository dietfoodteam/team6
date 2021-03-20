<template>
  <div class="all">
    <div class="box">
      <div class="title">
        <select
          id="occupation"
          name="occupation"
          v-model="closeSeg"
          class="title"
        >
          <option value="1">トップス</option>
          <option value="2">ボトムス</option>
          <option value="3">靴下</option>
          <option value="4">部屋着</option>
          <option value="5">くつ</option>
          <option value="6">アクセサリー</option>
          <option value="7">その他</option>
        </select>
      </div>
      <div v-for="item in items" :key="item.id">
        {{ item.title }}
      </div>
    </div>
    <div class="box">
      <div class="title">コーデ</div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase"

export default {
  data() {
    return {
      items: [],
    }
  },
  methods: {},
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
  flex-direction: row;
}

.title {
  width: 100px;
  height: 50px;
  background-color: rgb(128, 139, 107);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  width: 500px;
  height: 1000px;
  background-color: lightgray;
  margin: 10px;
  display: flex;
  justify-content: center;
  overflow: scroll;
}
</style>
