import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {

  apiKey: "AIzaSyCO5RpR3rTm51ol03LdAkpTGlMr_n3HK-4",

  authDomain: "todo-list-62fff.firebaseapp.com",

  projectId: "todo-list-62fff",

  storageBucket: "todo-list-62fff.appspot.com",

  messagingSenderId: "335624627785",

  appId: "1:335624627785:web:4567217c711b86c656c198"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export default db;