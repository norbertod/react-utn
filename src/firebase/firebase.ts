import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDJpwJpEZWhhZ19BJZNI8CnE8r6u19U-80",
    authDomain: "tp-react-utn.firebaseapp.com",
    projectId: "tp-react-utn",
    storageBucket: "tp-react-utn.appspot.com",
    messagingSenderId: "690624343598",
    appId: "1:690624343598:web:fc7a96ec7791cd299939bf"
  };

app.initializeApp(firebaseConfig);

const db = app.firestore();
const auth = app.auth();

export {auth, db}