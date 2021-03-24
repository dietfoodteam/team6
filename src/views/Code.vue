<template>
  <div class="all">
    <div class="topTitle">
      <h1>コーデ登録</h1>
    </div>
    <div class="containers">
      <div class="left-container">
        <div class="codeTitle">
          コーデタイトル
          <input type="text" />
        </div>
        <div class="clothSeg">
          洋服の種類
          <br />
          <select class="seg-box" name="occupation" v-model="closeSeg">
            <option value="" selected="selected">選択してください</option>
            <option value="tops">トップス</option>
            <option value="bottoms">ボトムス</option>
            <option value="socks">靴下</option>
            <option value="room-wear">部屋着</option>
            <option value="shoes">くつ</option>
            <option value="accessory">アクセサリー</option>
            <option value="other">その他</option>
          </select>
          <div class="SelectedCloth">
            ここに現在登録されている服を一覧表示する
          </div>
        </div>
      </div>
      <div class="right-container">
        選択されたコーディネートを表示
        <div class="twoInOne">
          <div>トップス：</div>
          <div class="tops">ここに選択したものがはいるようにする</div>
        </div>
        <div class="twoInOne">
          <div>ボトムス：</div>
          <div class="bottoms">ここに選択したものがはいるようにする</div>
        </div>
        <div class="twoInOne">
          <div>トップス：</div>
          <div class="tops">ここに選択したものがはいるようにする</div>
        </div>
        <div class="twoInOne">
          <div>トップス：</div>
          <div class="tops">ここに選択したものがはいるようにする</div>
        </div>
        <div class="twoInOne">
          <div>トップス：</div>
          <div class="tops">ここに選択したものがはいるようにする</div>
        </div>
        <div class="twoInOne">
          <div>トップス：</div>
          <div class="tops">ここに選択したものがはいるようにする</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue"
export default Vue.extend({})
</script>

<style scoped>
.all {
  display: flex;
  flex-direction: column;
}
.containers {
  display: flex;
  flex-direction: row;
}
.twoInOne {
  display: flex;
  flex-direction: row;
}
</style>
