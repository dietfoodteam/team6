<template>
  <div class="all">
    <div class="title">YOUR COORDINATE</div>
    <div class="all__image">
      <div
        v-for="cloth in item.clothes"
        :key="cloth.id"
        class="all__image__coorde"
      >
        <ClosetItem v-bind:item="cloth"> </ClosetItem>
      </div>
    </div>
    <img v-bind:src="item.imageUrl" alt="" class="item__image" />

    <div all__edit>
      <div style="text-align:center">
        <v-switch v-model="editMode" inset></v-switch>
      </div>
      <!-- <button v-on:click="editItem">編集</button> -->
      <div style="text-align:center;margin:2rem">
        <h3>コーデタイトル</h3>
        <input
          type="text"
          v-model="item.title"
          v-if="editMode"
          class="deText"
        />
        <div v-else>{{ item.title }}</div>
      </div>

      <div>
        <h3 style="text-align:center">コメント</h3>
        <textarea
          v-model="item.comment"
          v-if="editMode"
          class="deText"
          style="width:400px; height:100px;"
        />
        <div v-else style="text-align:center">{{ item.comment }}</div>
      </div>
      <!-- <div v-else class="ex">{{ item.explain }}</div>
    <input type="date" v-model="item.date" v-if="editMode" class="detext" />
    <div v-else>{{ item.date }}</div>
    <input type="url" v-model="item.shop" v-if="editMode" class="deText" />
    <div v-else>{{ item.shop }}</div> -->

      <!-- <button v-on:click="saveChanges">変更保存</button> -->
      <div style="text-align:center">
        <v-btn
          icon
          color="green"
          v-on:click="saveChanges"
          style="margin:2rem 0rem;"
        >
          <v-icon>mdi-cached</v-icon>
        </v-btn>
      </div>
    </div>
  </div>

  <!-- {{ $route.params.id }} -->
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
      editMode: false,
      item: {
        title: "",
        seg: "",
        comment: "",
        explain: "",
        date: "",
        shop: "",
        imageUrl: "",
        clothes: [],
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
        .collection("coordinate")
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
      .collection("coordinate")
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
  background-color: rgb(236, 236, 219);
}
.title {
  font-family: fantasy;
  background-color: rgb(181, 190, 149);
  text-align: center;
  padding: 2rem 1rem;
  margin: 3rem 1rem 1rem 1rem;
}
.all__image {
  background-color: #ececc6;
  border: dashed;
  border-color: rgb(177, 187, 143);
  border-radius: 2rem;
  display: flex;
  flex-direction: row;
  margin: 2rem;
  padding: 50px 7rem;
}
.all__image__coorde {
  margin: 20px;
}
.item__image {
  height: 20rem;
  width: auto;
}
.all__edit {
}
.ex {
}
.deText {
  border: dotted;
  background-color: rgb(227, 235, 225);
  border-color: rgba(177, 172, 172, 0.925);
  border-width: 1px;
  margin: 5px;
}
</style>
