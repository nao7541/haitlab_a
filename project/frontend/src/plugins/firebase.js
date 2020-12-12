import Vue from 'vue';
import { firestorePlugin } from 'vuefire';
import firebase from 'firebase/app';
import 'firebase/firestore';
Vue.use(firestorePlugin);

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBoaHrLBqr1zOhXsFxQFJy_QBNAGgAjc0k",
    authDomain: "haitlab-a-337b6.firebaseapp.com",
    projectId: "haitlab-a-337b6",
    storageBucket: "haitlab-a-337b6.appspot.com",
    messagingSenderId: "115594304256",
    appId: "1:115594304256:web:19ed2a1aefc7a4189a31e5",
    measurementId: "G-M49Q2W6YN9"
});

export const db = firebaseApp.firestore();