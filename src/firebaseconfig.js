import firebase from 'firebase'

import 'firebase/firestore'

const  firebaseConfig = {
    apiKey: "AIzaSyAzqhpyRNfOhBtBKn3pXHJn4AN4rnteCMY",
    authDomain: "reactauth-ec495.firebaseapp.com",
    projectId: "reactauth-ec495",
    storageBucket: "reactauth-ec495.appspot.com",
    messagingSenderId: "672209794895",
    appId: "1:672209794895:web:853a90d1d54a3b84a9773a",
    measurementId: "G-0D68S7LFVK"
  };
  // Initialize Firebase
  const fireb= firebase.initializeApp(firebaseConfig);
  const db = fireb.firestore();

  export { db }

