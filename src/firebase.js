import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyBquCe-8jn7QrYutaLLKnT4GzeHeZOd_NE",
  authDomain: "ahkilichat.firebaseapp.com",
  projectId: "ahkilichat",
  storageBucket: "ahkilichat.appspot.com",
  messagingSenderId: "415618029207",
  appId: "1:415618029207:web:73fa9bd4239abc650b7bd2"
  }).auth();

  export default auth;