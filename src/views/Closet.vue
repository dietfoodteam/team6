<template>
  <div class="all">
    <div class="frame">
      <div class="title">
        <select
          id="occupation"
          name="occupation"
          v-model="closeSeg"
          class="title"
        >
          <option value="tops">トップス</option>
          <option value="bottoms">ボトムス</option>
          <option value="socks">靴下</option>
          <option value="room-wear">部屋着</option>
          <option value="shoes">くつ</option>
          <option value="accessory">アクセサリー</option>
          <option value="other">その他</option>
        </select>
      </div>
      <div v-on:click="getImages">更新</div>
      <div class="box">
        <div v-for="item in items" :key="item.id">
          <span v-if="closeSeg == item.seg">
            <div class="list">
              <ul>
                <li>
                  <ClosetItem v-bind:item="item"></ClosetItem>
                  <button v-on:click="delate">削除</button>
                  <button>編集</button>
                </li>
              </ul>
            </div>
          </span>
        </div>
      </div>
    </div>

    <div class="frame">
      <div class="title">コーデ</div>
      <div class="box"></div>
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
    delete(id) {
      firebase
        .firestore()
        .collection("closet")
        .doc(id)
        .delete()
        .then(() => (this.items = this.items.filter((item) => item.id !== id)))
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
  justify-content: space-around;
  flex-wrap: wrap;
  overflow: scroll;
}
.list {
  width: 100px;
  height: 100px;
}

.frame {
  display: flex;
  flex-direction: column;
}
</style>
