import firebase from "firebase";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3xjIW5WJQtqmslRnxejzVqDLnWkiBH6A",
    authDomain: "closet-team6.firebaseapp.com",
    projectId: "closet-team6",
    storageBucket: "closet-team6.appspot.com",
    messagingSenderId: "986649045571",
    appId: "1:986649045571:web:e583861cd706f313aa02f6",
    measurementId: "G-1Q6N1MF05K"
  };
  
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(user => {
  if (user) {
    // サインイン中
    // user_profiles コレクションから user.uid に対応するドキュメントを取得する。
    //
    // 初サインインでまだ user_profiles コレクションにドキュメントがない場合、ドキュメントを作成する。
  } else {
    // サインアウト中
  }
})