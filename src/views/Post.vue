<template>
  <div id="app">
    <h1 id="register">洋服登録</h1>
    <div>
      <div>
        <input type="file" name="example" accept="image/jpeg, image/png" />
        <dir class="photo"></dir>
      </div>

      <div>
        <input type="text" placeholder="タイトル入力" />
        <select id="occupation" name="occupation">
          <option value="" selected="selected">選択してください</option>
          <option value="1">トップス</option>
          <option value="2">ボトムス</option>
          <option value="3">靴下</option>
          <option value="4">部屋着</option>
          <option value="5">くつ</option>
          <option value="6">アクセサリー</option>
          <option value="7">その他</option>
        </select>
      </div>
      <textarea cols="30" rows="10"></textarea>
    </div>

    <button v-on:click="regist">登録</button><br />
  </div>
</template>

<script>
export default {
  date() {
    return {}
  },
  methods: {
    regist: function() {
      location.href = "Closet.vue"
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
