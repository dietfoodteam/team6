import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyD3xjIW5WJQtqmslRnxejzVqDLnWkiBH6A",
  authDomain: "closet-team6.firebaseapp.com",
  projectId: "closet-team6",
  storageBucket: "closet-team6.appspot.com",
  messagingSenderId: "986649045571",
  appId: "1:986649045571:web:e583861cd706f313aa02f6",
  measurementId: "G-1Q6N1MF05K",
}

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const storage = firebase.storage()
